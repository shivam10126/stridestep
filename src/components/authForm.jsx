import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import bgForm from "../assets/image.png"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isLogin) {
      // Handle login
      const storedData = JSON.parse(localStorage.getItem('authInfo'))
      if (storedData && storedData.email === formData.email && storedData.password === formData.password) {
        console.log('Login successful')
        setError('') // Clear error message
        navigate('/');
        
      } else {
        setError('Wrong email or password')
      }
    } else {
      // Handle signup
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields')
      } else {
        localStorage.setItem('authInfo', JSON.stringify(formData))
        console.log('Signup successful')
        setError('')
        toggleForm() // Automatically switch to login form
      }
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setFormData({ name: '', email: '', password: '' }) // Clear form data when switching
    setError('') // Clear any previous errors
  }

  return (
    <div className="flex items-center min-h-screen bg-cover bg-center" style={{backgroundImage:`url(${bgForm})`}}>
      <Card className="w-[450px] ml-28 bg-white bg-opacity-30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-[#eb432f]">Side Step</CardTitle>
          <CardDescription className="text-[#505b85] font-semibold">
            {isLogin ? 'Step into your account' : 'Join the Side Step family'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#505b85] font-semibold">Email or Username</Label>
                    <Input id="email" type="text" required value={formData.email} onChange={handleInputChange} className="border-[#9e92aa] focus:border-[#eb432f] bg-white bg-opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#505b85] font-semibold">Password</Label>
                    <Input id="password" type="password" required value={formData.password} onChange={handleInputChange} className="border-[#9e92aa] focus:border-[#eb432f] bg-white bg-opacity-70" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#505b85] font-semibold">Name</Label>
                    <Input id="name" type="text" required value={formData.name} onChange={handleInputChange} className="border-[#9e92aa] focus:border-[#eb432f] bg-white bg-opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#505b85] font-semibold">Email</Label>
                    <Input id="email" type="email" required value={formData.email} onChange={handleInputChange} className="border-[#9e92aa] focus:border-[#eb432f] bg-white bg-opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#505b85] font-semibold">Password</Label>
                    <Input id="password" type="password" required value={formData.password} onChange={handleInputChange} className="border-[#9e92aa] focus:border-[#eb432f] bg-white bg-opacity-70" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            <motion.div
              key="submit-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button type="submit" className="w-full mt-4 bg-[#eb432f] hover:bg-[#ec7751] text-white font-semibold">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-[#505b85] font-semibold">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="link" 
              className="pl-1 text-sm text-[#eb432f] hover:text-[white] font-semibold" 
              onClick={toggleForm}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
