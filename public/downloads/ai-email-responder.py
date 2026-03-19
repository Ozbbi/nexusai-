#!/usr/bin/env python3
"""
NexusAI AI Email Responder v1.0
https://nexusai.vercel.app

A professional AI-powered email auto-responder that analyzes incoming emails,
detects intent, and generates contextually appropriate replies. Built with
zero external dependencies — pure Python 3.

Features:
    - Intent detection via keyword/pattern matching (inquiry, complaint,
      request, feedback, support, billing, cancellation, appreciation)
    - Tone control: formal, friendly, or casual
    - CLI mode with --subject and --body flags
    - Interactive mode for manual email processing
    - JSON output for pipeline integration
    - Confidence scoring for intent classification

Usage:
    CLI mode:
        python ai-email-responder.py --subject "Subject" --body "Body text"

    Interactive mode:
        python ai-email-responder.py --interactive

    JSON output:
        python ai-email-responder.py --json --subject "Subject" --body "Body text"

    Set tone:
        python ai-email-responder.py --tone friendly --subject "..." --body "..."

License: MIT
Copyright (c) 2026 NexusAI AI — https://nexusai.vercel.app
"""

import argparse
import json
import re
import sys
import textwrap
from datetime import datetime
from typing import Dict, List, Tuple

# ---------------------------------------------------------------------------
# Version & branding
# ---------------------------------------------------------------------------

APP_NAME = "NexusAI AI Email Responder"
APP_VERSION = "1.0"
APP_URL = "https://nexusai.vercel.app"
BANNER = f"""
 ____              _   _
/ ___| _   _ _ __ | |_| |__   _____  __
\\___ \\| | | | '_ \\| __| '_ \\ / _ \\ \\/ /
 ___) | |_| | | | | |_| | | |  __/>  <
|____/ \\__, |_| |_|\\__|_| |_|\\___/_/\\_\\
       |___/
  {APP_NAME} v{APP_VERSION}
  {APP_URL}
"""

# ---------------------------------------------------------------------------
# Intent categories and keyword patterns
# ---------------------------------------------------------------------------

INTENT_PATTERNS: Dict[str, List[str]] = {
    "inquiry": [
        r"\b(how|what|when|where|who|which|can you|could you|do you)\b",
        r"\b(information|details|learn more|tell me|wondering|curious)\b",
        r"\b(question|ask|asking|inquir|enquir)\b",
        r"\b(available|offer|provide|options)\b",
    ],
    "complaint": [
        r"\b(unhappy|dissatisfied|terrible|awful|horrible|worst)\b",
        r"\b(complain|complaint|unacceptable|frustrated|furious|angry)\b",
        r"\b(broken|damaged|defective|faulty|not working|doesnt work|doesn't work)\b",
        r"\b(poor (quality|service|experience)|disappointed|let down)\b",
        r"\b(demand|refund|escalat|manager|supervisor)\b",
    ],
    "support": [
        r"\b(help|assist|support|trouble|issue|problem|error)\b",
        r"\b(cant|can't|cannot|unable|won't|wont|doesn't|doesnt)\b",
        r"\b(bug|crash|freeze|stuck|fail|broken|fix)\b",
        r"\b(install|setup|configur|integrat|connect)\b",
        r"\b(troubleshoot|debug|resolve|solution)\b",
    ],
    "billing": [
        r"\b(bill|invoice|charge|payment|subscription|pricing)\b",
        r"\b(receipt|transaction|overcharg|double.?charg)\b",
        r"\b(credit card|bank|account balance|renewal)\b",
        r"\b(upgrade|downgrade|plan|tier)\b",
    ],
    "cancellation": [
        r"\b(cancel|unsubscribe|terminate|close.?account|opt.?out)\b",
        r"\b(stop|end|discontinue|no longer (need|want|wish))\b",
        r"\b(delete.?(my|the)?.?account|remove.?(my|the)?.?data)\b",
    ],
    "feedback": [
        r"\b(feedback|suggestion|recommend|improve|feature request)\b",
        r"\b(would be (nice|great|better)|you should|please add)\b",
        r"\b(idea|proposal|enhancement|wish list)\b",
        r"\b(review|opinion|thoughts on)\b",
    ],
    "appreciation": [
        r"\b(thank|thanks|thx|grateful|appreciate)\b",
        r"\b(great (job|work|service)|well done|excellent|amazing)\b",
        r"\b(love (your|the)|awesome|fantastic|wonderful|impressed)\b",
        r"\b(keep (it )?up|good work|kudos|bravo)\b",
    ],
    "request": [
        r"\b(request|need|require|want|looking for|seeking)\b",
        r"\b(please (send|provide|share|forward|update))\b",
        r"\b(can (i|we) (get|have|receive))\b",
        r"\b(order|purchase|buy|quote|estimate|proposal)\b",
    ],
}

# ---------------------------------------------------------------------------
# Response templates — keyed by (intent, tone)
# ---------------------------------------------------------------------------

RESPONSE_TEMPLATES: Dict[str, Dict[str, str]] = {
    "inquiry": {
        "formal": (
            "Thank you for reaching out to us with your inquiry.\n\n"
            "We appreciate your interest and would be happy to provide the "
            "information you need. Our team has reviewed your message regarding "
            '"{subject}" and we would like to address your questions thoroughly.\n\n'
            "We will compile the relevant details and follow up with a "
            "comprehensive response within one business day. Should you require "
            "immediate assistance, please do not hesitate to contact our support "
            "team directly.\n\n"
            "We value your engagement and look forward to assisting you."
        ),
        "friendly": (
            "Hi there! Thanks for getting in touch with us!\n\n"
            "Great question about \"{subject}\" — we're happy to help. "
            "Let me look into this for you and get back to you with all the "
            "details you need.\n\n"
            "In the meantime, feel free to check out our knowledge base for "
            "quick answers. We'll have a full response for you shortly!"
        ),
        "casual": (
            "Hey! Thanks for reaching out.\n\n"
            "Good question about \"{subject}\". Let me dig into this and "
            "get back to you with the details ASAP.\n\n"
            "Talk soon!"
        ),
    },
    "complaint": {
        "formal": (
            "Thank you for bringing this matter to our attention.\n\n"
            "We sincerely apologize for the experience you have described "
            'regarding "{subject}". We understand your frustration and want '
            "to assure you that we take all concerns very seriously.\n\n"
            "Your case has been flagged as high priority and has been escalated "
            "to our senior team for immediate review. We are committed to "
            "resolving this matter to your satisfaction and will provide a "
            "detailed update within 24 hours.\n\n"
            "We deeply value your business and regret any inconvenience caused."
        ),
        "friendly": (
            "Thank you for letting us know about this, and we're truly sorry "
            "for the trouble.\n\n"
            "We completely understand how frustrating this must be, and we want "
            "to make it right. Your concern about \"{subject}\" is now a top "
            "priority for our team.\n\n"
            "We're on it and will get back to you with a resolution as quickly "
            "as possible. Thanks for your patience!"
        ),
        "casual": (
            "Hey, we hear you and we're really sorry about this.\n\n"
            "That's definitely not the experience we want anyone to have. "
            "We're looking into \"{subject}\" right now and will get back "
            "to you with a fix soon.\n\n"
            "Hang tight — we've got you."
        ),
    },
    "support": {
        "formal": (
            "Thank you for contacting our technical support team.\n\n"
            "We have received your request regarding \"{subject}\" and our "
            "engineers are currently investigating the matter. To expedite "
            "resolution, a support ticket has been created and assigned to "
            "a specialist.\n\n"
            "In the interim, please ensure your software is up to date and "
            "consider restarting the application. If the issue persists, our "
            "team will provide step-by-step guidance in our follow-up response.\n\n"
            "We appreciate your patience as we work to resolve this."
        ),
        "friendly": (
            "Thanks for reaching out to support!\n\n"
            "We've logged your issue about \"{subject}\" and our tech team is "
            "already looking into it. While we investigate, here are a couple "
            "of quick things you can try:\n\n"
            "  1. Make sure you're running the latest version\n"
            "  2. Try restarting the application\n"
            "  3. Clear your cache and try again\n\n"
            "We'll get back to you with a full solution soon!"
        ),
        "casual": (
            "Hey! Sorry you're running into trouble.\n\n"
            "We've got your report on \"{subject}\" and we're looking into it. "
            "Quick tip — try restarting and updating to the latest version. "
            "That fixes most issues.\n\n"
            "If not, sit tight and we'll sort it out for you!"
        ),
    },
    "billing": {
        "formal": (
            "Thank you for contacting us regarding your billing matter.\n\n"
            "We have received your inquiry about \"{subject}\" and our "
            "billing department is reviewing your account. Please rest assured "
            "that all billing discrepancies are handled with the utmost care "
            "and urgency.\n\n"
            "A billing specialist will review your account details and respond "
            "within one business day with a complete resolution. For reference, "
            "please have your account number or recent invoice available.\n\n"
            "We appreciate your patience in this matter."
        ),
        "friendly": (
            "Thanks for getting in touch about your billing concern!\n\n"
            "We've noted your message about \"{subject}\" and our billing "
            "team is taking a look right now. We want to make sure everything "
            "is correct on your account.\n\n"
            "We'll follow up soon with the details. If you have your invoice "
            "or account number handy, that can help speed things up!"
        ),
        "casual": (
            "Hey! Got your message about billing.\n\n"
            "We're checking on \"{subject}\" now. If you have your invoice "
            "number, send it over and we'll get it sorted quickly.\n\n"
            "We'll be in touch soon!"
        ),
    },
    "cancellation": {
        "formal": (
            "We have received your cancellation request regarding \"{subject}\".\n\n"
            "We are sorry to see you go and would like to understand if there "
            "is anything we can do to address your concerns. Your satisfaction "
            "is our priority, and we are open to discussing alternative "
            "arrangements that may better suit your needs.\n\n"
            "Should you wish to proceed, your request will be processed within "
            "3-5 business days and you will receive a confirmation email. Any "
            "applicable refunds will be issued according to our refund policy.\n\n"
            "We value the time you have spent with us."
        ),
        "friendly": (
            "We received your message about \"{subject}\" and we're sorry "
            "to hear you'd like to cancel.\n\n"
            "Before we process anything, is there something we could do "
            "differently? We'd love the chance to make things better. If you'd "
            "still like to proceed, just let us know and we'll take care of it "
            "within a few business days.\n\n"
            "Either way, thanks for being a customer!"
        ),
        "casual": (
            "Hey, we got your note about cancelling.\n\n"
            "We're bummed to see you go! Anything we can do to change your "
            "mind? If not, no worries — we'll process it and send you a "
            "confirmation.\n\n"
            "Thanks for giving us a try!"
        ),
    },
    "feedback": {
        "formal": (
            "Thank you for taking the time to share your feedback.\n\n"
            "Your insights regarding \"{subject}\" are invaluable to our "
            "continuous improvement efforts. We have forwarded your suggestions "
            "to our product development team for careful consideration.\n\n"
            "We actively incorporate customer feedback into our roadmap, and "
            "your input helps us build a better product. We will notify you "
            "should your suggestions be implemented in a future update.\n\n"
            "We sincerely appreciate your contribution."
        ),
        "friendly": (
            "Thanks so much for the feedback!\n\n"
            "We love hearing ideas from our users, and your thoughts on "
            "\"{subject}\" are really helpful. We've passed this along to "
            "our product team — they're always looking for ways to improve.\n\n"
            "Keep the ideas coming!"
        ),
        "casual": (
            "Hey, thanks for the feedback on \"{subject}\"!\n\n"
            "We love getting suggestions from people who actually use the "
            "product. We've noted it down and our team will take a look.\n\n"
            "Cheers!"
        ),
    },
    "appreciation": {
        "formal": (
            "Thank you sincerely for your kind words.\n\n"
            "It is gratifying to know that our efforts regarding \"{subject}\" "
            "have met your expectations. Your positive feedback is shared with "
            "our entire team, and it serves as a tremendous source of "
            "motivation.\n\n"
            "We remain committed to maintaining the high standards you have "
            "come to expect from us. Thank you for your continued trust."
        ),
        "friendly": (
            "Wow, thank you so much! That really made our day!\n\n"
            "We're thrilled to hear your kind words about \"{subject}\". "
            "We'll make sure the whole team sees this — it means a lot to us.\n\n"
            "Thanks for being awesome!"
        ),
        "casual": (
            "Hey, thanks a ton! Really appreciate the kind words.\n\n"
            "Glad you're happy with \"{subject}\". We'll pass this along "
            "to the team — it'll make their day!\n\n"
            "You rock!"
        ),
    },
    "request": {
        "formal": (
            "Thank you for your request.\n\n"
            "We have received your message regarding \"{subject}\" and our "
            "team is preparing the necessary information. We aim to fulfill "
            "all requests promptly and will provide a detailed response "
            "within one business day.\n\n"
            "If there are any specific details or preferences you would like "
            "to include, please do not hesitate to let us know.\n\n"
            "We appreciate your interest."
        ),
        "friendly": (
            "Thanks for reaching out!\n\n"
            "We've got your request about \"{subject}\" and we're working "
            "on it. We'll have everything you need ready for you shortly.\n\n"
            "If there's anything else, just let us know!"
        ),
        "casual": (
            "Hey! Got your request about \"{subject}\".\n\n"
            "We're on it and will get back to you soon with everything "
            "you need. Stay tuned!"
        ),
    },
}

# Fallback for unrecognized intent
DEFAULT_TEMPLATES: Dict[str, str] = {
    "formal": (
        "Thank you for your email regarding \"{subject}\".\n\n"
        "We have received your message and our team is reviewing it. We will "
        "provide a thoughtful response within one business day.\n\n"
        "Should you require immediate assistance, please do not hesitate "
        "to contact us directly.\n\n"
        "We appreciate your patience."
    ),
    "friendly": (
        "Thanks for getting in touch!\n\n"
        "We've received your email about \"{subject}\" and we're on it. "
        "We'll get back to you soon with a helpful response.\n\n"
        "Thanks for your patience!"
    ),
    "casual": (
        "Hey! Got your message about \"{subject}\".\n\n"
        "We'll take a look and get back to you soon.\n\n"
        "Talk later!"
    ),
}


# ---------------------------------------------------------------------------
# Core analysis engine
# ---------------------------------------------------------------------------

def classify_intent(subject: str, body: str) -> List[Tuple[str, float]]:
    """Classify the email intent by scoring keyword pattern matches.

    Returns a list of (intent, confidence) tuples sorted by confidence
    descending. Confidence is normalised to the range 0.0 .. 1.0.
    """
    combined = f"{subject} {body}".lower()
    scores: Dict[str, int] = {}

    for intent, patterns in INTENT_PATTERNS.items():
        total_hits = 0
        for pattern in patterns:
            total_hits += len(re.findall(pattern, combined, re.IGNORECASE))
        if total_hits > 0:
            scores[intent] = total_hits

    if not scores:
        return [("general", 0.5)]

    max_score = max(scores.values())
    results = [
        (intent, round(min(hits / max(max_score, 1), 1.0), 2))
        for intent, hits in scores.items()
    ]
    results.sort(key=lambda x: x[1], reverse=True)
    return results


def generate_response(
    subject: str,
    body: str,
    tone: str = "formal",
) -> Dict:
    """Analyse the email and produce a structured response dict.

    Keys returned:
        subject, body, detected_intent, confidence, tone,
        response, all_intents, timestamp
    """
    intents = classify_intent(subject, body)
    primary_intent, confidence = intents[0]

    templates = RESPONSE_TEMPLATES.get(primary_intent, DEFAULT_TEMPLATES)
    template = templates.get(tone, templates.get("formal", ""))
    response_text = template.format(subject=subject)

    # Build the reply subject line
    reply_subject = f"Re: {subject}"

    return {
        "subject": reply_subject,
        "original_body": body,
        "detected_intent": primary_intent,
        "confidence": confidence,
        "tone": tone,
        "response": response_text,
        "all_intents": intents,
        "timestamp": datetime.now().isoformat(),
        "generator": f"{APP_NAME} v{APP_VERSION}",
    }


# ---------------------------------------------------------------------------
# Output formatters
# ---------------------------------------------------------------------------

def print_response(result: Dict) -> None:
    """Pretty-print the response to stdout."""
    sep = "-" * 60
    print(sep)
    print(f"  {APP_NAME} v{APP_VERSION}")
    print(f"  {APP_URL}")
    print(sep)
    print(f"  Intent   : {result['detected_intent']} "
          f"(confidence: {result['confidence']:.0%})")
    print(f"  Tone     : {result['tone']}")
    print(f"  Subject  : {result['subject']}")
    print(sep)
    print()
    print(textwrap.indent(result["response"], "  "))
    print()
    print(sep)
    if len(result["all_intents"]) > 1:
        print("  Other detected intents:")
        for intent, conf in result["all_intents"][1:]:
            print(f"    - {intent}: {conf:.0%}")
        print(sep)


def print_json(result: Dict) -> None:
    """Print the response as formatted JSON."""
    output = {
        "generator": result["generator"],
        "timestamp": result["timestamp"],
        "analysis": {
            "primary_intent": result["detected_intent"],
            "confidence": result["confidence"],
            "all_intents": {i: c for i, c in result["all_intents"]},
        },
        "reply": {
            "subject": result["subject"],
            "tone": result["tone"],
            "body": result["response"],
        },
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))


# ---------------------------------------------------------------------------
# Interactive mode
# ---------------------------------------------------------------------------

def interactive_mode(tone: str) -> None:
    """Run an interactive session that processes emails one at a time."""
    print(BANNER)
    print("  Interactive mode — type 'quit' or 'exit' to stop.\n")

    while True:
        try:
            subject = input("  Email subject: ").strip()
            if subject.lower() in ("quit", "exit", "q"):
                break

            print("  Email body (enter a blank line to finish):")
            lines: List[str] = []
            while True:
                line = input("  | ")
                if line == "":
                    break
                lines.append(line)

            body = "\n".join(lines)
            if not body:
                print("  [Skipped — empty body]\n")
                continue

            result = generate_response(subject, body, tone)
            print()
            print_response(result)
            print()

        except (EOFError, KeyboardInterrupt):
            print("\n  Goodbye!")
            break

    print(f"\n  Powered by {APP_NAME} v{APP_VERSION}")
    print(f"  {APP_URL}\n")


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    """Build the argument parser."""
    parser = argparse.ArgumentParser(
        prog="ai-email-responder",
        description=f"{APP_NAME} v{APP_VERSION} — {APP_URL}",
        epilog="Zero-dependency AI email auto-responder powered by pattern matching.",
    )
    parser.add_argument(
        "--subject", "-s",
        type=str,
        help="Email subject line",
    )
    parser.add_argument(
        "--body", "-b",
        type=str,
        help="Email body text",
    )
    parser.add_argument(
        "--tone", "-t",
        choices=["formal", "friendly", "casual"],
        default="formal",
        help="Response tone (default: formal)",
    )
    parser.add_argument(
        "--json", "-j",
        action="store_true",
        dest="json_output",
        help="Output the response as JSON",
    )
    parser.add_argument(
        "--interactive", "-i",
        action="store_true",
        help="Run in interactive mode",
    )
    parser.add_argument(
        "--version", "-v",
        action="version",
        version=f"{APP_NAME} v{APP_VERSION}",
    )
    return parser


def main() -> None:
    """Main entry point."""
    parser = build_parser()
    args = parser.parse_args()

    # Interactive mode
    if args.interactive:
        interactive_mode(args.tone)
        return

    # CLI mode — require subject and body
    if not args.subject or not args.body:
        print(BANNER)
        parser.print_help()
        sys.exit(1)

    result = generate_response(args.subject, args.body, args.tone)

    if args.json_output:
        print_json(result)
    else:
        print_response(result)


if __name__ == "__main__":
    main()
