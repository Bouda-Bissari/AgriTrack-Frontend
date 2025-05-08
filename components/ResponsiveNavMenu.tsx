'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronsDownUp } from 'lucide-react';
import { Check } from 'lucide-react';
import { User, KeyRound } from 'lucide-react' // ou où sont définis tes icônes

const links = [
  {
    title: "Profil",
    href: "/dashboard-landowner/account/profile",
    icon: User,
  },
  {
    title: "Password",
    href: "/dashboard-landowner/account/password",
    icon: KeyRound,
  },
]

export default function ResponsiveNavMenu() {
  const router = useRouter()
  const [selected, setSelected] = useState(links[0])

  const handleChange = (link) => {
    setSelected(link)
    router.push(link.href)
  }

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-2">
          <ListboxButton className="flex w-full items-center justify-between rounded-md bg-white py-2 px-3 text-sm text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <div className="flex items-center gap-2">
              <selected.icon className="w-4 h-4" />
              <span>{selected.title}</span>
            </div>
            <ChevronsDownUp className="h-4 w-4 text-gray-500" aria-hidden="true" />
          </ListboxButton>

          <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {links.map((link) => (
              <ListboxOption
                key={link.href}
                value={link}
                className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 text-gray-900 hover:bg-indigo-600 hover:text-white"
              >
                <link.icon className="w-4 h-4" />
                <span className="block truncate">{link.title}</span>
                {selected.href === link.href && (
                  <Check className="ml-auto h-5 w-5 text-indigo-600" />
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  )
}
