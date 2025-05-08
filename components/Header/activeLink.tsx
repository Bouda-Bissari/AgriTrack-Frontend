'use client'

import Link from "next/link"
import { useState } from "react"
import clsx from "clsx"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export const ActiveLink = ({ href, className, children }: Props) => {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const handleClick = (href: string) => {
    // Si l'élément est déjà actif, le réinitialiser, sinon le mettre comme actif
    setActiveItem(activeItem === href ? null : href)
  }

  return (
    <Link 
      href={href} 
      onClick={() => handleClick(href)}  // Met à jour l'élément actif au clic
      className={clsx(activeItem === href && "font-bold ", "cursor-pointer hover:underline text-[#E8FCC2]", {className})} // Applique un style si c'est l'élément actif
    >
      {children}
    </Link>
  )
}
