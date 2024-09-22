import { useState, useEffect } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"

function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed top-10 left-0 right-0 flex justify-center z-50 transition-all duration-100">
      <div className="bg-white border-2 border-[#6e36aa] rounded-lg p-4 shadow-lg mt-0">
        <p className="text-lg font-semibold text-[#6e36aa]">{message}</p>
      </div>
    </div>
  )
}

export default function NewsLetter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Submitted email:', email)
    setIsSubmitted(true)
    setShowPopup(true)
    setEmail('')
  }

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#6e36aa] font-roboto-slab">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold text-white sm:text-4xl text-center mb-8">
          Stay in the Loop with StrideStep!
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:max-w-xs rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
          />
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <Button 
              type="submit"
              className="w-full sm:w-auto flex items-center transition-all justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#eb432f] hover:bg-[#ed2f1a] focus:outline-none focus:ring-0"
            >
              Subscribe
            </Button>
          </div>
        </form>
        <p className="mt-3 text-lg text-white sm:text-center">
          Join our newsletter to receive the latest updates on new arrivals, exclusive deals, and more!
        </p>
        <p className="mt-3 text-lg text-white sm:text-center">
          Sign up and get <span className='text-xl font-bold text-[#e94f3e]'>10%</span> off your next purchase!
        </p>
        {isSubmitted && (
          <p className="mt-4 text-lg text-[#e94f3e] font-semibold sm:text-center">
           We respect your privacy. Your email will only be used to send you updates and promotions.
          </p>
        )}
      </div>
      {showPopup && (
        <Popup 
          message="Thank you for subscribing! Check your inbox for a special discount." 
          onClose={() => setShowPopup(false)} 
        />
      )}
    </div>
  )
}