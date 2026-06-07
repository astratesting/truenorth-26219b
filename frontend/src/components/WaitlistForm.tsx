import { useState, ChangeEvent, FormEvent } from 'react'

interface WaitlistFormData {
  name: string
  email: string
  company: string
  idea: string
}

interface WaitlistFormProps {
  onSuccess?: () => void
}

function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    company: '',
    idea: ''
  })
  const [errors, setErrors] = useState<Partial<WaitlistFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function validateForm(): boolean {
    const newErrors: Partial<WaitlistFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof WaitlistFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to join waitlist')
      }

      setIsSubmitted(true)
      setFormData({ name: '', email: '', company: '', idea: '' })
      onSuccess?.()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="waitlist" className="bg-truenorth-50 section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're on the list!</h2>
            <p className="text-xl text-gray-600 mb-8">
              Thanks for joining TrueNorth. We'll notify you when we launch.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist" className="bg-truenorth-50 section-padding">
      <div className="container-max">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get Early Access
            </h2>
            <p className="text-xl text-gray-600">
              Join the waitlist and be first to launch with TrueNorth.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-truenorth-500 focus:border-transparent transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Jane Smith"
              />
              {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-truenorth-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="jane@startup.com"
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-truenorth-500 focus:border-transparent transition-colors"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label htmlFor="idea" className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your idea
              </label>
              <textarea
                id="idea"
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-truenorth-500 focus:border-transparent transition-colors resize-none"
                placeholder="Describe your startup idea in a few sentences..."
              />
            </div>

            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
            </button>

            <p className="text-center text-sm text-gray-500">
              By joining, you agree to receive launch updates. No spam, ever.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default WaitlistForm
