import { useEffect, useRef } from 'react'

const codeLines = [
  'const app = express()',
  'import React from "react"',
  'function handleRequest(req, res) {',
  '  const data = await db.query(sql)',
  '  return res.json({ success: true })',
  'export default App',
  'npm install express mongoose',
  'const [state, setState] = useState()',
  'router.get("/api/users", getUsers)',
  'useEffect(() => { fetchData() }, [])',
  'const schema = new Schema({ name: String })',
  'app.listen(3000, () => console.log("🚀"))',
  '<div className="container">',
  'git commit -m "feat: add auth"',
  'const token = jwt.sign(payload, secret)',
  'SELECT * FROM users WHERE id = $1',
  'docker build -t myapp .',
  'async function getData() {',
  '  try { await fetch(url) }',
  'module.exports = router',
  'const result = arr.map(x => x * 2)',
  'npx create-react-app my-app',
  'border-radius: 12px;',
  'transition: all 0.3s ease;',
  'background: linear-gradient(...)',
  'display: flex; gap: 1rem;',
  'const PORT = process.env.PORT || 5000',
  'mongoose.connect(MONGO_URI)',
  'res.status(200).json(data)',
  'onClick={() => setOpen(!open)}',
  'className="text-white font-bold"',
  'padding: 2rem; margin: auto;',
  'return <Component {...props} />',
  'const ref = useRef(null)',
  'position: fixed; z-index: 50;',
]

export default function CodeRain({ darkMode }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    const columns = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initColumns()
    }

    function initColumns() {
      columns.length = 0
      const colCount = Math.floor(canvas.width / 220)
      for (let i = 0; i < colCount; i++) {
        const linesInCol = 3 + Math.floor(Math.random() * 4)
        const lines = []
        for (let j = 0; j < linesInCol; j++) {
          lines.push({
            text: codeLines[Math.floor(Math.random() * codeLines.length)],
            y: -Math.random() * canvas.height * 2,
            speed: 0.3 + Math.random() * 0.5,
            opacity: 0.15 + Math.random() * 0.2,
            size: 10 + Math.floor(Math.random() * 3),
          })
        }
        columns.push({
          x: (i + 0.5) * (canvas.width / colCount) + (Math.random() - 0.5) * 60,
          lines,
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      columns.forEach((col) => {
        col.lines.forEach((line) => {
          ctx.font = `300 ${line.size}px 'Courier New', monospace`
          ctx.fillStyle = darkMode
            ? `rgba(168, 130, 255, ${line.opacity})`
            : `rgba(120, 80, 200, ${line.opacity * 0.7})`
          ctx.fillText(line.text, col.x, line.y)

          line.y += line.speed

          // Reset when off screen
          if (line.y > canvas.height + 50) {
            line.y = -30
            line.text = codeLines[Math.floor(Math.random() * codeLines.length)]
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [darkMode])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
