#!/usr/bin/env python3
"""
NexusAI Sentiment Analyzer v1.0
A lightweight sentiment analysis tool that works offline.
No API keys required - runs 100% locally.

Usage:
    python sentiment-analyzer.py "Your text here"
    python sentiment-analyzer.py --file input.txt
    python sentiment-analyzer.py --interactive

Author: NexusAI Team
License: MIT
Website: https://nexusai.vercel.app
"""

import sys
import re
import json
from collections import Counter

# ============================================================
# SENTIMENT LEXICON - Curated word lists with intensity scores
# ============================================================

POSITIVE_WORDS = {
    # Strong positive (score: 3)
    "amazing": 3, "excellent": 3, "outstanding": 3, "incredible": 3,
    "fantastic": 3, "wonderful": 3, "brilliant": 3, "exceptional": 3,
    "superb": 3, "magnificent": 3, "phenomenal": 3, "extraordinary": 3,
    "perfect": 3, "love": 3, "adore": 3, "thrilled": 3,
    "ecstatic": 3, "delighted": 3, "overjoyed": 3, "blessed": 3,

    # Medium positive (score: 2)
    "great": 2, "good": 2, "happy": 2, "pleased": 2, "glad": 2,
    "enjoy": 2, "like": 2, "nice": 2, "beautiful": 2, "impressive": 2,
    "recommend": 2, "helpful": 2, "valuable": 2, "useful": 2,
    "effective": 2, "efficient": 2, "reliable": 2, "quality": 2,
    "comfortable": 2, "satisfied": 2, "positive": 2, "success": 2,
    "elegant": 2, "innovative": 2, "intuitive": 2, "powerful": 2,
    "smooth": 2, "fast": 2, "easy": 2, "friendly": 2,
    "exciting": 2, "fun": 2, "awesome": 2, "cool": 2,

    # Mild positive (score: 1)
    "ok": 1, "okay": 1, "fine": 1, "decent": 1, "fair": 1,
    "adequate": 1, "reasonable": 1, "acceptable": 1, "alright": 1,
    "better": 1, "improved": 1, "interesting": 1, "works": 1,
    "functional": 1, "solid": 1, "stable": 1, "clean": 1,
    "simple": 1, "clear": 1, "handy": 1, "convenient": 1,
}

NEGATIVE_WORDS = {
    # Strong negative (score: -3)
    "terrible": -3, "horrible": -3, "awful": -3, "disgusting": -3,
    "hate": -3, "worst": -3, "pathetic": -3, "atrocious": -3,
    "dreadful": -3, "abysmal": -3, "catastrophic": -3, "nightmare": -3,
    "disaster": -3, "toxic": -3, "scam": -3, "fraud": -3,
    "unbearable": -3, "unacceptable": -3, "outrageous": -3, "furious": -3,

    # Medium negative (score: -2)
    "bad": -2, "poor": -2, "disappointing": -2, "frustrated": -2,
    "annoying": -2, "broken": -2, "useless": -2, "waste": -2,
    "ugly": -2, "slow": -2, "difficult": -2, "confusing": -2,
    "expensive": -2, "overpriced": -2, "unreliable": -2, "buggy": -2,
    "crash": -2, "error": -2, "fail": -2, "failure": -2,
    "angry": -2, "upset": -2, "unhappy": -2, "regret": -2,
    "complaint": -2, "problem": -2, "issue": -2, "wrong": -2,
    "boring": -2, "mediocre": -2, "lacking": -2, "weak": -2,

    # Mild negative (score: -1)
    "meh": -1, "average": -1, "nothing special": -1, "could be better": -1,
    "minor": -1, "slight": -1, "small": -1, "concern": -1,
    "wish": -1, "hope": -1, "unfortunately": -1, "however": -1,
    "but": -1, "although": -1, "limited": -1, "basic": -1,
    "outdated": -1, "old": -1, "complex": -1, "complicated": -1,
}

NEGATION_WORDS = {"not", "no", "never", "neither", "nobody", "nothing",
                   "nowhere", "nor", "cannot", "can't", "don't", "doesn't",
                   "didn't", "won't", "wouldn't", "shouldn't", "couldn't",
                   "isn't", "aren't", "wasn't", "weren't", "hardly", "barely"}

INTENSIFIERS = {"very": 1.5, "really": 1.5, "extremely": 2.0, "incredibly": 2.0,
                "absolutely": 2.0, "totally": 1.5, "completely": 1.5,
                "utterly": 2.0, "highly": 1.5, "super": 1.5, "so": 1.3,
                "quite": 1.2, "pretty": 1.2, "fairly": 1.1, "somewhat": 0.8,
                "slightly": 0.5, "a bit": 0.7, "kind of": 0.7, "sort of": 0.7}

EMOJI_SENTIMENT = {
    "😀": 2, "😃": 2, "😄": 2, "😁": 2, "😆": 2, "😊": 2, "🥰": 3,
    "😍": 3, "🤩": 3, "😘": 2, "👍": 2, "👏": 2, "🎉": 2, "❤️": 3,
    "💯": 2, "🔥": 2, "⭐": 2, "🌟": 2, "✅": 1, "💪": 2, "🚀": 2,
    "😢": -2, "😭": -3, "😡": -3, "🤬": -3, "👎": -2, "💔": -2,
    "😞": -2, "😔": -2, "😤": -2, "🤮": -3, "❌": -2, "⚠️": -1,
    "😐": 0, "🤔": 0, "😶": 0,
}


class SentimentAnalyzer:
    """A rule-based sentiment analyzer with emoji and negation support."""

    def __init__(self):
        self.positive_words = POSITIVE_WORDS
        self.negative_words = NEGATIVE_WORDS
        self.negation_words = NEGATION_WORDS
        self.intensifiers = INTENSIFIERS
        self.emoji_sentiment = EMOJI_SENTIMENT

    def preprocess(self, text):
        """Clean and tokenize the text."""
        # Extract emojis before cleaning
        emoji_pattern = re.compile(
            "[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF"
            "\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF"
            "\U00002702-\U000027B0\U000024C2-\U0001F251"
            "\U0000FE00-\U0000FE0F\U00002600-\U000026FF"
            "\U00002700-\U000027BF❤️✅❌⚠️]+", flags=re.UNICODE
        )
        emojis = emoji_pattern.findall(text)

        # Clean text
        clean_text = text.lower().strip()
        clean_text = re.sub(r'[^\w\s\'-]', ' ', clean_text)
        clean_text = re.sub(r'\s+', ' ', clean_text)
        words = clean_text.split()

        return words, emojis

    def analyze(self, text):
        """Analyze sentiment of the given text."""
        if not text or not text.strip():
            return self._empty_result()

        words, emojis = self.preprocess(text)

        total_score = 0
        word_scores = []
        positive_count = 0
        negative_count = 0
        neutral_count = 0

        # Analyze words
        i = 0
        while i < len(words):
            word = words[i]

            # Check for intensifier
            intensifier = 1.0
            if word in self.intensifiers and i + 1 < len(words):
                intensifier = self.intensifiers[word]
                i += 1
                word = words[i]

            # Check for negation (look back 1-3 words)
            negated = False
            for j in range(max(0, i - 3), i):
                if words[j] in self.negation_words:
                    negated = True
                    break

            # Score the word
            score = 0
            if word in self.positive_words:
                score = self.positive_words[word] * intensifier
                if negated:
                    score = -score * 0.75  # Negation flips but reduces intensity
            elif word in self.negative_words:
                score = self.negative_words[word] * intensifier
                if negated:
                    score = -score * 0.75

            if score > 0:
                positive_count += 1
            elif score < 0:
                negative_count += 1
            else:
                neutral_count += 1

            total_score += score
            if score != 0:
                word_scores.append({"word": word, "score": round(score, 2), "negated": negated})

            i += 1

        # Analyze emojis
        emoji_score = 0
        for emoji in emojis:
            for char in emoji:
                if char in self.emoji_sentiment:
                    emoji_score += self.emoji_sentiment[char]
        total_score += emoji_score

        # Normalize score to -1 to 1 range
        max_possible = max(len(words) * 3, 1)
        normalized_score = max(-1, min(1, total_score / (max_possible * 0.3)))

        # Determine sentiment label
        if normalized_score >= 0.3:
            label = "POSITIVE"
            confidence = min(0.99, 0.6 + abs(normalized_score) * 0.4)
        elif normalized_score <= -0.3:
            label = "NEGATIVE"
            confidence = min(0.99, 0.6 + abs(normalized_score) * 0.4)
        elif normalized_score >= 0.1:
            label = "SLIGHTLY POSITIVE"
            confidence = 0.5 + abs(normalized_score) * 0.3
        elif normalized_score <= -0.1:
            label = "SLIGHTLY NEGATIVE"
            confidence = 0.5 + abs(normalized_score) * 0.3
        else:
            label = "NEUTRAL"
            confidence = 0.5 + (1 - abs(normalized_score)) * 0.3

        return {
            "text": text[:200] + ("..." if len(text) > 200 else ""),
            "sentiment": label,
            "score": round(normalized_score, 4),
            "confidence": round(confidence, 4),
            "raw_score": round(total_score, 2),
            "word_count": len(words),
            "positive_words": positive_count,
            "negative_words": negative_count,
            "emoji_score": emoji_score,
            "key_words": sorted(word_scores, key=lambda x: abs(x["score"]), reverse=True)[:10],
            "summary": self._generate_summary(label, confidence, word_scores)
        }

    def _empty_result(self):
        return {
            "text": "",
            "sentiment": "NEUTRAL",
            "score": 0,
            "confidence": 0,
            "raw_score": 0,
            "word_count": 0,
            "positive_words": 0,
            "negative_words": 0,
            "emoji_score": 0,
            "key_words": [],
            "summary": "No text provided for analysis."
        }

    def _generate_summary(self, label, confidence, word_scores):
        """Generate a human-readable summary."""
        if not word_scores:
            return "The text appears neutral with no strong sentiment indicators."

        top_positive = [w for w in word_scores if w["score"] > 0][:3]
        top_negative = [w for w in word_scores if w["score"] < 0][:3]

        parts = [f"Overall sentiment: {label} (confidence: {confidence:.0%})."]

        if top_positive:
            words = ", ".join(f'"{w["word"]}"' for w in top_positive)
            parts.append(f"Positive indicators: {words}.")

        if top_negative:
            words = ", ".join(f'"{w["word"]}"' for w in top_negative)
            parts.append(f"Negative indicators: {words}.")

        return " ".join(parts)

    def analyze_batch(self, texts):
        """Analyze multiple texts and return aggregate results."""
        results = [self.analyze(text) for text in texts]

        avg_score = sum(r["score"] for r in results) / max(len(results), 1)
        sentiment_dist = Counter(r["sentiment"] for r in results)

        return {
            "total_texts": len(texts),
            "average_score": round(avg_score, 4),
            "sentiment_distribution": dict(sentiment_dist),
            "most_positive": max(results, key=lambda x: x["score"]) if results else None,
            "most_negative": min(results, key=lambda x: x["score"]) if results else None,
            "individual_results": results
        }


def print_result(result, verbose=False):
    """Pretty print analysis result."""
    print("\n" + "=" * 60)
    print(f"  SENTIMENT ANALYSIS RESULT")
    print("=" * 60)
    print(f"  Text:       {result['text']}")
    print(f"  Sentiment:  {result['sentiment']}")
    print(f"  Score:      {result['score']} (range: -1 to 1)")
    print(f"  Confidence: {result['confidence']:.0%}")
    print(f"  Words:      {result['word_count']}")
    print("-" * 60)
    print(f"  {result['summary']}")

    if verbose and result["key_words"]:
        print("-" * 60)
        print("  Key Words:")
        for kw in result["key_words"]:
            neg = " (negated)" if kw["negated"] else ""
            sign = "+" if kw["score"] > 0 else ""
            print(f"    • {kw['word']}: {sign}{kw['score']}{neg}")

    print("=" * 60)

    # Visual sentiment bar
    bar_pos = int((result["score"] + 1) / 2 * 40)
    bar = "▓" * bar_pos + "░" * (40 - bar_pos)
    print(f"  Negative [{bar}] Positive")
    print()


def interactive_mode(analyzer):
    """Run interactive analysis mode."""
    print("\n🧠 NexusAI Sentiment Analyzer - Interactive Mode")
    print("   Type text to analyze. Type 'quit' to exit.\n")

    while True:
        try:
            text = input("📝 Enter text: ").strip()
            if text.lower() in ("quit", "exit", "q"):
                print("\n👋 Thanks for using NexusAI Sentiment Analyzer!")
                break
            if text:
                result = analyzer.analyze(text)
                print_result(result, verbose=True)
        except (KeyboardInterrupt, EOFError):
            print("\n\n👋 Goodbye!")
            break


def main():
    analyzer = SentimentAnalyzer()

    if len(sys.argv) < 2:
        print("NexusAI Sentiment Analyzer v1.0")
        print("Usage:")
        print("  python sentiment-analyzer.py \"Your text here\"")
        print("  python sentiment-analyzer.py --file input.txt")
        print("  python sentiment-analyzer.py --interactive")
        print("  python sentiment-analyzer.py --json \"Your text here\"")
        print("\nExample:")
        print("  python sentiment-analyzer.py \"This product is amazing and works perfectly!\"")
        return

    if sys.argv[1] == "--interactive":
        interactive_mode(analyzer)

    elif sys.argv[1] == "--file":
        if len(sys.argv) < 3:
            print("Error: Please provide a file path.")
            return
        try:
            with open(sys.argv[2], "r", encoding="utf-8") as f:
                lines = [line.strip() for line in f if line.strip()]
            if len(lines) == 1:
                result = analyzer.analyze(lines[0])
                print_result(result, verbose=True)
            else:
                batch_result = analyzer.analyze_batch(lines)
                print(f"\n📊 Batch Analysis: {batch_result['total_texts']} texts")
                print(f"   Average Score: {batch_result['average_score']}")
                print(f"   Distribution: {batch_result['sentiment_distribution']}")
                for r in batch_result["individual_results"]:
                    print_result(r)
        except FileNotFoundError:
            print(f"Error: File '{sys.argv[2]}' not found.")

    elif sys.argv[1] == "--json":
        text = " ".join(sys.argv[2:])
        result = analyzer.analyze(text)
        print(json.dumps(result, indent=2, ensure_ascii=False))

    else:
        text = " ".join(sys.argv[1:])
        result = analyzer.analyze(text)
        print_result(result, verbose=True)


if __name__ == "__main__":
    main()
