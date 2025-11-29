"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const carSections: { title: string; href: string; description: string }[] = [
  {
    title: "Browse Cars",
    href: "/cars/browse",
    description:
      "Explore our wide range of new and used cars suitable for all budgets and preferences.",
  },
  {
    title: "Sell Your Car",
    href: "/cars/sell",
    description:
      "List your car easily and reach thousands of potential buyers. Get the best offer today.",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
    description:
      "Learn how buying and selling on CarMarketPlace is simple, secure, and fast.",
  },
  {
    title: "Financing",
    href: "/financing",
    description:
      "Flexible car financing options to help you drive your dream car home.",
  },
  {
    title: "Car Reviews",
    href: "/reviews",
    description:
      "Read reviews, ratings and insights from real car owners before you decide.",
  },
  {
    title: "FAQs",
    href: "/faq",
    description:
      "Find answers to common questions about buying, selling, and our services.",
  },
]

export function NavigationMenuDemo() {
  // Fix: UseEffect for window for SSR safety
  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
  }, [])

  return (
    <div className="w-full flex items-center justify-center p-2 ">
      <NavigationMenu viewport={isMobile} className="   ">
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                      href="/"
                    >
                      <div className="mb-2 text-lg font-medium sm:mt-4">
                        CarMarketPlace
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Buy and sell your car easily, fast and secure.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about" title="About Us">
                  Learn more about our vision and how we connect car buyers and sellers nationwide.
                </ListItem>
                <ListItem href="/contact" title="Contact">
                  Reach out for support, feedback, or business inquiries. We're here to help!
                </ListItem>
                <ListItem href="/blog" title="Blog">
                  Latest news, tips, and trends in the world of car buying and selling.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Marketplace</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {carSections.map((section) => (
                  <ListItem
                    key={section.title}
                    title={section.title}
                    href={section.href}
                  >
                    {section.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/cars/sell">Sell Car</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>For Buyers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/cars/browse">
                      <div className="font-medium">Browse Cars</div>
                      <div className="text-muted-foreground">
                        Find cars by brand, model, price, and more.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/financing">
                      <div className="font-medium">Financing Options</div>
                      <div className="text-muted-foreground">
                        Flexible plans to make car buying easier for you.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/faq">
                      <div className="font-medium">Support & FAQ</div>
                      <div className="text-muted-foreground">
                        Get your questions answered before you buy.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>For Sellers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/cars/sell">Sell Your Car</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/pricing">Pricing Guide</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/guides/seller">Selling Tips</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger>Status</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/my-listings" className="flex-row items-center gap-2">
                      <CircleHelpIcon />
                      My Listings
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/my-bids" className="flex-row items-center gap-2">
                      <CircleIcon />
                      My Bids
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/my-purchases" className="flex-row items-center gap-2">
                      <CircleCheckIcon />
                      My Purchases
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
