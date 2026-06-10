'use client';

import { useEffect, useState } from 'react';

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function labelDifficulty(n) {
  if (n === 1) return 'Socle';
  if (n === 2) return 'Confirmé';
  if (n === 3) return 'BM4';
  if (n === 4) return 'EMIA / ODS';
  return 'Expert';
}

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [session, setSession] = useState([]);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [mode, setMode] = useState(20);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/questions');
    const json = await res.json();
    setQuestions(json.questions || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function start() {
    const selected = shuffle(questions).slice(0, Number(mode));
    setSession(selected);
    setIndex(0);
    setChoice(null);
    setScore(0);
  }

  const q = session[index];
  const answered = choice !== null;
  const finished = session.length > 0 && index >= session.length;

  function answer(letter) {
    if (answered) return;
    setChoice(letter);
    if (letter === q.bonne_reponse) setScore(s => s + 1);
  }

  function next() {
    if (index + 1 >= session.length) {
      setIndex(session.length);
    } else {
      setIndex(i => i + 1);
      setChoice(null);
    }
  }

  return (
    <main className="container">
      <header className="header">
        <h1>QCM Culture générale — Armée de Terre</h1>
        <p className="muted">Entraînement et mode examen pour préparants déjà familiers de l’institution.</p>
      </header>

      <div className="nav">
        <a href="/admin">Administration</a>
      </div>

      <section className="card">
        {loading && <p>Chargement des questions...</p>}

        {!loading && questions.length === 0 && (
          <div className="notice">
            Aucune question dans la base. Va dans Administration pour importer un CSV.
          </div>
        )}

        <div className="grid">
          <div className="stat">
            <strong>{session.length ? Math.min(index + 1, session.length) : 0}</strong>
            <span>Question</span>
          </div>
          <div className="stat">
            <strong>{questions.length}</strong>
            <span>Banque</span>
          </div>
          <div className="stat">
            <strong>{score}</strong>
            <span>Bonnes réponses</span>
          </div>
          <div className="stat">
            <strong>{session.length ? Math.round(score / Math.max(1, answered ? index + 1 : index) * 100) || 0 : 0}%</strong>
            <span>Réussite</span>
          </div>
        </div>

        <div className="controls">
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="20">Examen 20 questions</option>
            <option value="50">Examen 50 questions</option>
            <option value="100">Examen 100 questions</option>
          </select>
          <button className="primary" onClick={start} disabled={questions.length === 0}>
            Démarrer / mélanger
          </button>
        </div>

        {finished && (
          <div className="explanation">
            <strong>Résultat final : {score} / {session.length}</strong>
            <br />
            Taux de réussite : {Math.round(score / session.length * 100)} %
          </div>
        )}

        {q && !finished && (
          <>
            <div className="badge">Difficulté : {labelDifficulty(q.difficulte)}</div>

            {q.theme && <div className="badge">Thème : {q.theme}</div>}

            <h2>{q.question}</h2>

            {['A', 'B', 'C', 'D'].map(letter => {
              const text = q['reponse_' + letter.toLowerCase()];
              let cls = 'answer';

              if (answered && letter === q.bonne_reponse) cls += ' good';
              if (answered && letter === choice && letter !== q.bonne_reponse) cls += ' bad';

              return (
                <button key={letter} className={cls} onClick={() => answer(letter)}>
                  {letter}. {text}
                </button>
              );
            })}

            {answered && (
              <>
                <div className="explanation">
                  <strong>Correction :</strong> bonne réponse {q.bonne_reponse}.
                  <br />
                  <br />

                  {q.explication && (
                    <>
                      <strong>Explication :</strong>
                      <br />
                      {q.explication}
                      <br />
                      <br />
                    </>
                  )}

                  {q.theme && (
                    <>
                      <strong>Thème :</strong> {q.theme}
                      <br />
                    </>
                  )}

                  {q.source && (
                    <>
                      <strong>Source :</strong> {q.source}
                    </>
                  )}
                </div>

                <div className="controls">
                  <button className="primary" onClick={next}>
                    Question suivante
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
