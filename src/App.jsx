import { useMemo, useState } from 'react'

const knowledgeBase = [
  {
    title: 'Cold & Cough',
    keywords: ['cold', 'cough', 'sore throat', 'runny nose', 'sneezing'],
    tips: [
      'Sip warm water or ginger-honey tea every few hours.',
      'Do gentle steam inhalation for 5–7 minutes to ease a blocked nose.',
      'Avoid cold drinks and get good rest.',
      'Homeopathic options often used: Aconite 30 for sudden chills, Bryonia 30 for dry cough, Arsenicum Album 30 for runny nose. Follow pack guidance.',
    ],
    watch: 'See a doctor if fever is above 101°F, breathing is hard, or symptoms last more than 4–5 days.',
  },
  {
    title: 'Fever & Body Ache',
    keywords: ['fever', 'body ache', 'chills', 'weakness'],
    tips: [
      'Keep yourself hydrated with water or light soups.',
      'Rest in a cool, quiet room and use a light blanket.',
      'You may sponge with lukewarm water to feel comfortable.',
      'Homeopathic options often used: Ferrum Phos 6X for mild fever, Gelsemium 30 for dull ache and weakness.',
    ],
    watch: 'Seek urgent care if fever crosses 102°F, there is chest pain, or continuous vomiting.',
  },
  {
    title: 'Stomach Upset & Acidity',
    keywords: ['stomach', 'acidity', 'gas', 'nausea', 'vomit', 'diarrhea'],
    tips: [
      'Take small, bland meals like toast, rice, or bananas.',
      'Sip oral rehydration salts to prevent dehydration.',
      'Avoid spicy, oily, or very sweet foods for now.',
      'Homeopathic options often used: Nux Vomica 30 for acidity after heavy food, Carbo Veg 30 for gas and bloating.',
    ],
    watch: 'Get medical help if there is blood in stool, severe pain, or no urine for 8 hours.',
  },
  {
    title: 'Stress, Sleep & Anxiety',
    keywords: ['stress', 'anxiety', 'sleep', 'insomnia', 'tension'],
    tips: [
      'Take slow deep breaths for 5 minutes to calm your body.',
      'Keep gadgets away 30 minutes before sleep; dim the lights.',
      'Have warm milk or herbal tea; avoid caffeine in the evening.',
      'Homeopathic options often used: Kali Phos 6X for mental fatigue, Coffea 30 for racing thoughts at night.',
    ],
    watch: 'Talk to a doctor if you feel panic, chest tightness, or sadness that stays for weeks.',
  },
  {
    title: 'Skin & Allergies',
    keywords: ['rash', 'itch', 'allergy', 'hives', 'eczema', 'redness'],
    tips: [
      'Wash gently with cool water and keep the area clean and dry.',
      'Apply a light aloe vera gel; avoid scratching.',
      'Identify and avoid the trigger (new soap, food, or dust).',
      'Homeopathic options often used: Apis 30 for sudden itchy swelling, Rhus Tox 30 for itchy rashes that get better with warmth.',
    ],
    watch: 'Meet a doctor if swelling is on lips/eyes, breathing is hard, or rash spreads fast.',
  },
]

const promptIdeas = [
  'I have a cold with sneezing and sore throat.',
  'I feel acidity and stomach bloating after food.',
  'I am stressed and cannot sleep at night.',
  'There is a rash with itching on my hand.',
  'I have fever with body ache since last night.',
]

const buildReply = (question) => {
  const text = question.toLowerCase()
  const matched = knowledgeBase.find((item) =>
    item.keywords.some((keyword) => text.includes(keyword)),
  )

  if (!matched) {
    return [
      "Thanks for sharing. Tell me your main symptom, how long it's been there, and any current medicines.",
      'I will share simple care steps and when you should meet a doctor.',
      'For safety, get urgent help for chest pain, breath trouble, or very high fever.',
    ]
  }

  return [
    `${matched.title} - here is a simple care plan:`,
    ...matched.tips,
    `When to seek medical help: ${matched.watch}`,
    'These are general tips. If symptoms worsen, please see a nearby doctor.',
  ]
}

function App() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      lines: [
        'Hello! I am your Homeopathic Care Agent.',
        'Ask any health query in simple words and I will reply in an easy way.',
        'Share your main symptom, how long it has been there, and if you take any medicine.',
        'I provide general information only. This is not a diagnosis or emergency service.',
        'Do not share personal IDs; your messages stay in this browser session.',
      ],
    },
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanQuery = query.trim()
    if (!cleanQuery) return

    const replyLines = buildReply(cleanQuery)
    setMessages((prev) => [
      ...prev,
      { sender: 'you', lines: [cleanQuery] },
      { sender: 'assistant', lines: replyLines },
    ])
    setQuery('')
  }

  const bannerText = useMemo(
    () => ({
      title: 'Homeopathic Query Agent',
      subtitle: 'Friendly answers in simple language for common homeopathic care.',
      note: 'Not for emergencies. Visit a doctor for serious or lasting symptoms.',
    }),
    [],
  )

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">MediConnect</p>
          <h1>{bannerText.title}</h1>
          <p className="subtitle">{bannerText.subtitle}</p>
          <p className="note">{bannerText.note}</p>
          <div className="prompt-grid">
            {promptIdeas.map((idea) => (
              <button
                key={idea}
                className="prompt"
                type="button"
                onClick={() => setQuery(idea)}
              >
                {idea}
              </button>
            ))}
          </div>
        </div>
        <div className="card summary">
          <h2>How it works</h2>
          <ul>
            <li>Type your concern in simple words.</li>
            <li>Get 3–5 clear steps you can follow.</li>
            <li>See when you should meet a doctor.</li>
            <li>Easy language, homeopathic-focused guidance.</li>
          </ul>
        </div>
      </header>

      <main className="layout">
        <section className="card chat">
          <div className="chat-window" role="log" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`bubble ${message.sender}`}>
                <span className="sender">{message.sender === 'you' ? 'You' : 'Agent'}</span>
                {message.lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          <form className="composer" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="query">
              Ask your question
            </label>
            <input
              id="query"
              name="query"
              placeholder="Describe your symptom or question in simple words"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            <button type="submit">Get Answer</button>
          </form>
          <p className="micro-note">
            Informational use only. For severe or lasting problems, please contact a qualified doctor.
          </p>
        </section>

        <section className="card tips">
          <h2>Quick care reminders</h2>
          <ul>
            <li>Keep a note of symptom start time and severity.</li>
            <li>Do not stop prescribed medicines without medical advice.</li>
            <li>Drink enough water unless your doctor advised otherwise.</li>
            <li>For chest pain, breathing trouble, or fainting, seek emergency care.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
