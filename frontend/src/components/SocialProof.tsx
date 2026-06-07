import React from 'react'

const SocialProof: React.FC = () => {
  const testimonials = [
    {
      quote: "TrueNorth gave us the structure we needed to go from idea to launch-ready in just 3 weeks. The operating plan alone saved us months of trial and error.",
      author: "Sarah Chen",
      role: "Founder, DataFlow",
      avatar: "SC"
    },
    {
      quote: "The outreach assets were game-changing. We had our first 50 beta users signed up within 48 hours of using the email templates and pitch deck.",
      author: "Marcus Johnson",
      role: "CEO, StackSync",
      avatar: "MJ"
    },
    {
      quote: "Finally, a product that understands what early-stage founders actually need. The launch surface converted at 23% right out of the gate.",
      author: "Elena Rodriguez",
      role: "Co-founder, GreenTech",
      avatar: "ER"
    }
  ]

  const stats = [
    { number: '500+', label: 'Founders Launched' },
    { number: '14+', label: 'Launch Artifacts' },
    { number: '23%', label: 'Avg. Conversion Rate' },
    { number: '3 weeks', label: 'To Launch-Ready' }
  ]

  return (
    <section id="proof" className="bg-gray-50 section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Founders
          </h2>
          <p className="text-xl text-gray-600">
            See how TrueNorth is helping founders launch with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
              <svg className="w-8 h-8 text-truenorth-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-truenorth-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-truenorth-600 mb-2">
                {stat.number}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialProof
