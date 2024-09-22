import React from 'react'
import { Link } from "react-router-dom"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react"

const Footer = () => {
  const quickLinks = ["Shop", "About Us", "Contact Us", "FAQ", "Returns & Shipping"]
  const legalLinks = ["Privacy Policy", "Terms & Conditions", "Cookie Policy"]

  return (
    <footer className="bg-gray-900 text-gray-300 font-roboto-slab">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-[#eb432f]  tracking-widest font-protest">StrideStep</h2>
            <p className="text-lg text-white ">Your go-to for quality and style in every step.</p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, name: 'Facebook' },
                { icon: Instagram, name: 'Instagram' },
                { icon: Twitter, name: 'Twitter' }
              ].map(({ icon: Icon, name }) => (
                <Link key={name} to="#" className="hover:text-[#eb432f] transition-colors">
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold  text-[#eb432f] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className=" transition-colors flex items-center hover:text-[#eb432f] group">
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold  mb-4 text-[#eb432f]">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                123 Shoe Lane, Stepville, ST 12345
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                support@stridestep.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#eb432f]  mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe for exclusive deals and updates!</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button type="submit" className="w-full bg-[#eb432f] transition-all duration-100 text-[white] hover:bg-[#ed2d18]">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StrideStep. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
            {legalLinks.map((item) => (
              <Link key={item} to={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-white transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer