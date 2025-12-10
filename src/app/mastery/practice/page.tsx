"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const questions = [
  {
    id: 1,
    difficulty: "Medium",
    topic: "Thermodynamics",
    question: "A gas expands from 2.0 L to 6.0 L at a constant pressure of 3.0 atm. How much work is done by the gas?",
    options: ["12 L·atm", "4.0 L·atm", "18 L·atm", "8.0 L·atm"],
    correct: 0,
    hint: "Work done at constant pressure is W = PΔV."
  },
  {
    id: 2,
    difficulty: "Hard",
    topic: "Thermodynamics",
    question: "If the internal energy of the system increases by 50 J and 20 J of work is done ON the system, what is the heat added?",
    options: ["30 J", "70 J", "50 J", "-30 J"],
    correct: 0,
    hint: "First Law of Thermodynamics: ΔU = Q - W (or Q + W depending on convention). Here, W_on = 20J."
  }
];

export default function PracticePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [streak] = useState(2);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // End of demo
      alert("Practice session complete! Mastery updated.");
    }
  };

  const question = questions[currentQ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/mastery" className={styles.backLink}>← Back to Profile</Link>
        <div className={styles.streakBadge}>
          🔥 {streak} Streak
        </div>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
      </div>

      <div className={`${styles.card} glass-panel`}>
        <div className={styles.questionHeader}>
          <span className={styles.topicTag}>{question.topic}</span>
          <span className={styles.difficultyTag} style={{ 
            color: question.difficulty === 'Hard' ? '#FF3D71' : '#FFB900',
            background: question.difficulty === 'Hard' ? 'rgba(255, 61, 113, 0.1)' : 'rgba(255, 185, 0, 0.1)'
          }}>
            {question.difficulty}
          </span>
        </div>
        
        <h3 className={styles.questionText}>{question.question}</h3>

        <div className={styles.options}>
          {question.options.map((opt, i) => (
            <button 
              key={i}
              className={`
                ${styles.optionBtn} 
                ${selected === i ? styles.selected : ''}
                ${showResult && i === question.correct ? styles.correct : ''}
                ${showResult && selected === i && i !== question.correct ? styles.wrong : ''}
              `}
              onClick={() => !showResult && handleAnswer(i)}
              disabled={showResult}
            >
              <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          ))}
        </div>

        {showResult && (
          <div className={styles.feedback}>
            <div className={styles.feedbackText}>
              {selected === question.correct ? (
                <span style={{ color: '#00E096' }}>Correct! Well done.</span>
              ) : (
                <span style={{ color: '#FF3D71' }}>Not quite. Review the hint below.</span>
              )}
            </div>
            <div className={styles.hint}>
              <strong>Hint:</strong> {question.hint}
            </div>
            <button className="btn-primary" onClick={nextQuestion}>
              {currentQ < questions.length - 1 ? "Next Question →" : "Finish Practice"}
            </button>
          </div>
        )}
      </div>

      <div className={styles.adaptiveInfo}>
        <span className={styles.infoIcon}>ℹ️</span>
        <p>This question was selected because you showed instability in <strong>PV Diagrams</strong> last session. It is slightly above your current comfort zone.</p>
      </div>
    </div>
  );
}
