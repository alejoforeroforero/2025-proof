export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">404 - Page Not Found</h2>
        <p className="text-gray-400">The page {`you're`} looking for {`doesn't`} exist.</p>
      </div>
    </div>
  )
}