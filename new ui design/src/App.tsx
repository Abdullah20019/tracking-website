/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useParams,
  useLocation
} from 'react-router-dom';
import {
  Search, 
  Truck, 
  Package, 
  ChevronRight, 
  ArrowLeft,
  Globe,
  ShieldCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  Menu,
  X
} from 'lucide-react';
import { Seo } from './Seo';
import { COURIER_LONG_FORM, COURIER_PAGE_META, HOME_LONG_FORM, HOME_PAGE_META, STATIC_PAGE_BY_SLUG, STATIC_PAGES } from './seo-content';
import { BLOG_ARTICLES, BLOG_ARTICLE_BY_COURIER_ID, BLOG_ARTICLE_BY_SLUG, BLOG_INDEX_META, BLOG_INTRO_SECTIONS, BLOG_SUPPLEMENTAL_SECTIONS } from './blog-content';

const COURIERS = [
  { id: 'tcs', slug: 'tcs-tracking', name: 'TCS', color: 'bg-red-600', textColor: 'text-white', logo: '/logos/tcs.jpg', logoBg: '#ffffff', description: 'Courier and logistics services across Pakistan.' },
  { id: 'leopards', slug: 'leopards-tracking', name: 'Leopards', color: 'bg-yellow-400', textColor: 'text-black', logo: '/logos/leopards.jpg', logoBg: '#fbbf24', description: 'Reliable courier and logistics solutions across Pakistan.' },
  { id: 'pakpost', slug: 'pakistan-post-tracking', name: 'Pakistan Post', color: 'bg-green-700', textColor: 'text-white', logo: '/logos/pakpost.jpg', logoBg: '#dc2626', description: 'The national postal service of Pakistan.' },
  { id: 'postex', slug: 'postex-tracking', name: 'PostEx', color: 'bg-blue-600', textColor: 'text-white', logo: '/logos/postex.png', logoBg: '#020617', description: 'E-commerce focused logistics and fintech provider.' },
  { id: 'mp', slug: 'm-and-p-tracking', name: 'M&P', color: 'bg-orange-500', textColor: 'text-white', logo: '/logos/mp.png', logoBg: '#ffffff', description: 'Muller & Phipps logistics and distribution services.' },
  { id: 'daewoo', slug: 'daewoo-tracking', name: 'Daewoo', color: 'bg-blue-900', textColor: 'text-white', logo: '/logos/daewoo.jpg', logoBg: '#21bdf2', description: 'Daewoo FastEx cargo and courier services.' },
  { id: 'trax', slug: 'trax-tracking', name: 'Trax', color: 'bg-black', textColor: 'text-white', logo: '/logos/trax.jpg', logoBg: '#ffffff', logoBorder: '1px solid #0f172a', description: 'Next-gen logistics for e-commerce businesses.' },
  { id: 'blueex', slug: 'blueex-tracking', name: 'BlueEx', color: 'bg-blue-500', textColor: 'text-white', logo: '/logos/blueex.jpg', logoBg: '#ffffff', description: 'Innovative logistics and e-commerce solutions.' },
];

const COURIER_SLUG_ALIASES: Record<string, string> = {
  'mp-tracking': 'm-and-p-tracking',
};

const HOME_SECTION_LINKS = {
  couriers: '/#couriers',
  contact: '/#contact',
  faqs: '/#faqs',
  reviews: '/#reviews',
  guides: '/#guides',
} as const;

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCouriersOpen, setIsCouriersOpen] = React.useState(false);
  const [isMobileCouriersOpen, setIsMobileCouriersOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
    setIsCouriersOpen(false);
    setIsMobileCouriersOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-110 transition-transform overflow-hidden bg-white">
                <img src="/websitelogo.png" alt="PakTrack logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 font-display">PAKTRACK</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <div
              className="relative"
              onMouseEnter={() => setIsCouriersOpen(true)}
              onMouseLeave={() => setIsCouriersOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCouriersOpen((open) => !open)}
                className="text-base font-semibold text-slate-600 hover:text-green-600 transition-colors flex items-center gap-2"
              >
                Couriers
                <ChevronRight size={16} className={`transition-transform ${isCouriersOpen ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {isCouriersOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full mt-4 w-72 rounded-[1.5rem] border border-slate-200 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-200 p-3"
                  >
                    <div className="grid gap-1">
                      {COURIERS.map((courier) => (
                        <Link
                          key={courier.id}
                          to={`/${courier.slug}`}
                          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-black/5"
                            style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
                          >
                            <img src={courier.logo} alt={`${courier.name} logo`} className="w-full h-full object-contain p-1.5" />
                          </div>
                          <div>
                            <div className="font-display font-bold text-slate-900">{courier.name}</div>
                            <div className="text-sm text-slate-500">Open tracking page</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/blog" className="text-base font-semibold text-slate-600 hover:text-green-600 transition-colors">Blog</Link>
            <Link to="/contact-us" className="text-base font-semibold text-slate-600 hover:text-green-600 transition-colors">Contact Us</Link>
              <a href={HOME_SECTION_LINKS.couriers} className="inline-flex bg-slate-900 text-white px-7 py-2.5 rounded-xl text-base font-bold hover:bg-green-600 transition-all shadow-xl shadow-slate-200 hover:shadow-green-200">
                Track Now
              </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-8 space-y-4 overflow-hidden"
          >
            <div className="px-2">
              <button
                type="button"
                onClick={() => setIsMobileCouriersOpen((open) => !open)}
                className="w-full text-left text-xl font-semibold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl flex items-center justify-between"
              >
                <span>Couriers</span>
                <ChevronRight size={18} className={`transition-transform ${isMobileCouriersOpen ? 'rotate-90' : ''}`} />
              </button>
              <AnimatePresence>
                {isMobileCouriersOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 ml-2 space-y-2 overflow-hidden"
                  >
                    {COURIERS.map((courier) => (
                      <Link
                        key={courier.id}
                        to={`/${courier.slug}`}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-slate-50"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden border border-black/5"
                          style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
                        >
                          <img src={courier.logo} alt={`${courier.name} logo`} className="w-full h-full object-contain p-1.5" />
                        </div>
                        <span className="text-base font-semibold text-slate-700">{courier.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/blog" className="block text-xl font-semibold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl">Blog</Link>
            <Link to="/contact-us" className="block text-xl font-semibold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl">Contact Us</Link>
            <div className="px-4 pt-2">
                <a href={HOME_SECTION_LINKS.couriers} className="block w-full text-center bg-green-600 text-white px-6 py-4 rounded-xl text-lg font-bold shadow-lg shadow-green-100">
                  Track Now
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ScrollToTop = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return null;
};

const COURIER_GUIDES: Record<string, { title: string, content: string, tips: string[], faqs: { q: string, a: string }[] }> = {
  tcs: {
    title: "TCS Tracking Guide: Everything You Need to Know",
    content: "If you've ever sent a parcel in Pakistan, chances are you've used TCS. It's the household name for courier services here, established back in 1983. Whether it's a critical document or a gift for a loved one, TCS is usually the first choice because of its massive network and reliability. To get started with tracking, just look for that 11-digit number on your receipt—that's your key to knowing exactly where your package is.",
    tips: ["The 11-digit CN number is usually at the top right of your booking slip.", "TCS Hazir is a lifesaver if you're too busy to visit a center; they'll come to you.", "Sentiments Express is perfect for those last-minute birthday surprises."],
    faqs: [
      { q: "How do I find my TCS tracking number?", a: "It's the 11-digit 'Consignment Number' (CN) printed on the top right corner of your booking receipt." },
      { q: "What are TCS delivery timings in Pakistan?", a: "TCS typically delivers between 9:00 AM and 6:00 PM, Monday to Saturday. Some express services might deliver on Sundays in major cities." },
      { q: "Can I track my TCS parcel without a tracking ID?", a: "Unfortunately, no. You need the CN number. If you've lost it, contact the sender or the originating TCS center with your CN details." },
      { q: "What does 'In Transit' mean in TCS tracking?", a: "It means your parcel is currently moving between TCS hubs or is on its way to the destination city." },
      { q: "How can I contact TCS customer support?", a: "You can call their helpline at (021) 111-123-456. They are quite responsive to queries." },
      { q: "Does TCS offer cash on delivery (COD) for small businesses?", a: "Yes, TCS has a dedicated E-com solution for online sellers with reliable COD settlements." },
      { q: "What is TCS Sentiments Express?", a: "It's a specialized service for sending gifts, cakes, and flowers across Pakistan and even internationally." },
      { q: "How long does TCS take for overnight delivery?", a: "As the name suggests, it's usually delivered the next working day between major cities." },
      { q: "Is TCS international tracking available?", a: "Yes, TCS has a strong international presence and you can track those shipments right here on our portal." },
      { q: "Why is my TCS tracking status not updating?", a: "It usually takes a few hours for the initial scan to show up. If it's been over 24 hours, give their helpline a call." }
    ]
  },
  leopards: {
    title: "Leopards Courier: Your Reliable Logistics Partner",
    content: "Leopards has really stepped up its game over the last few years. With over 1,500 locations, they're everywhere. What people love about Leopards is their 'Yellow Box'—it's sturdy and reliable for shipping almost anything. If you're an online shopper, you've likely seen their riders frequently. Tracking with them is straightforward; just grab your booking slip and enter the numeric ID.",
    tips: ["Keep your booking slip safe until the parcel is delivered.", "Their 'Mera Time' service is great if you want to be home when the rider arrives.", "The Yellow Box is the safest way to ship fragile items."],
    faqs: [
      { q: "How to track a Leopards Courier parcel?", a: "Enter your tracking ID from the booking receipt into our tracking tool to check the latest available status." },
      { q: "What is the Leopards helpline number?", a: "You can reach Leopards support at (021) 111-300-786 for any shipment-related issues." },
      { q: "Does Leopards deliver on Sundays?", a: "Standard delivery is Monday-Saturday, but special 'Overnight' parcels might be delivered on Sundays in big cities." },
      { q: "What is Leopards 'Mera Time' service?", a: "It's a premium service that lets you choose a specific 2-hour window for your delivery." },
      { q: "How many digits is a Leopards tracking ID?", a: "It's usually a 10 to 12 digit numeric code found on your consignment note." },
      { q: "Can I change my delivery address after shipping with Leopards?", a: "You'll need to contact their helpline immediately. It's possible if the parcel hasn't reached the final delivery hub." },
      { q: "What is the Leopards Yellow Box?", a: "It's a branded, high-quality packaging solution provided by Leopards for extra safety of your goods." },
      { q: "How long does Leopards take for domestic delivery?", a: "Overnight service takes 24 hours, while economy service can take 2-4 working days." },
      { q: "Does Leopards offer international shipping?", a: "Yes, they have a dedicated international wing for shipping to over 200 countries." },
      { q: "What if my Leopards parcel is lost?", a: "You should immediately file a claim at the nearest Leopards center with your original receipt." }
    ]
  },
  pakpost: {
    title: "Pakistan Post: The Backbone of National Logistics",
      content: "Pakistan Post is a widely used postal service with coverage across many cities and towns. If you're using their UMS (Urgent Mail Service), you can use the tracking ID on this portal to check the latest shipment updates.",
    tips: ["Always use UMS if you want to track your parcel online.", "Registered post is great for legal documents but takes a bit longer.", "International EMS is surprisingly fast and much cheaper than private options."],
    faqs: [
      { q: "How to track Pakistan Post UMS?", a: "Use the alphanumeric tracking ID (e.g., UM123456789PK) provided on your UMS receipt." },
      { q: "Is Pakistan Post tracking available for regular mail?", a: "No, tracking is only available for UMS, Registered Post, and EMS services." },
      { q: "What is the delivery time for Pakistan Post UMS?", a: "UMS usually delivers within 24-72 hours between major cities in Pakistan." },
      { q: "How can I find my nearest post office?", a: "Pakistan Post has over 13,000 offices. You can find the nearest GPO in your city's central area." },
      { q: "Does Pakistan Post deliver internationally?", a: "Yes, their EMS (Express Mail Service) is a very cost-effective way to send parcels abroad." },
      { q: "What is the difference between UMS and Registered Post?", a: "UMS is faster and fully trackable, while Registered Post is slower but provides a legal proof of delivery." },
      { q: "What to do if my Pakistan Post parcel is delayed?", a: "Visit your local GPO with your tracking receipt; their staff can often provide manual updates." },
      { q: "Is there a weight limit for Pakistan Post parcels?", a: "Yes, standard parcels have a limit of 30kg, but this can vary by service type." },
      { q: "Can I track international parcels arriving via Pakistan Post?", a: "Yes, once they enter Pakistan, you can track them using the original international ID." },
      { q: "What are the working hours of Pakistan Post?", a: "Most post offices work from 9:00 AM to 4:00 PM, Monday to Saturday." }
    ]
  },
  postex: {
    title: "PostEx: Modern Logistics for the E-commerce Era",
      content: "PostEx is focused on e-commerce logistics and merchant operations. If you run an online store, their delivery and COD tools may already be part of your workflow. You can use this page to check the latest available tracking details for PostEx shipments.",
    tips: ["PostEx is built for speed; their riders are usually very efficient in urban areas.", "Check your SMS for the direct tracking link they send.", "Their merchant portal is excellent for tracking your business growth."],
    faqs: [
      { q: "How do I track my PostEx order?", a: "Enter the tracking ID provided by the seller or found in your confirmation SMS into our portal." },
      { q: "What makes PostEx different from other couriers?", a: "They focus on e-commerce and offer instant cash-on-delivery settlements for sellers." },
      { q: "How long does PostEx take to deliver?", a: "In major cities like Karachi, Lahore, and Islamabad, they often deliver within 24-48 hours." },
      { q: "Does PostEx deliver on Sundays?", a: "They primarily operate Monday-Saturday, but may have special delivery windows for high-volume periods." },
      { q: "How can I contact PostEx support?", a: "You can reach them via their website or the contact details provided in your tracking SMS." },
      { q: "Is PostEx tracking real-time?", a: "Tracking updates depend on when PostEx scans and updates the shipment in their system." },
      { q: "Does PostEx handle fragile items?", a: "Yes, but like all couriers, ensure your items are packed securely with bubble wrap." },
      { q: "What is the PostEx merchant portal?", a: "It's a dashboard for sellers to manage orders, track payments, and see delivery analytics." },
      { q: "Can I return a parcel via PostEx?", a: "Yes, they have a streamlined reverse logistics process for e-commerce returns." },
      { q: "Where is PostEx based?", a: "They have major hubs in all large Pakistani cities, with their headquarters in Lahore." }
    ]
  },
  mp: {
    title: "M&P Courier: Corporate Reliability You Can Trust",
    content: "M&P (Muller & Phipps) has a long history in Pakistan, especially in distribution. When it comes to courier services, they're known for being professional and reliable. Many big companies trust them with their sensitive documents and high-value goods. If you're looking for a service that's consistent and has a solid corporate backing, M&P is a great choice.",
    tips: ["M&P is excellent for shipping electronics and expensive items.", "Their 'Same Day' service in major cities is very reliable.", "Always check the airway bill number for accurate tracking."],
    faqs: [
      { q: "How to track M&P courier shipments?", a: "Use the tracking number from your M&P airway bill and enter it in our search tool above." },
      { q: "What is the M&P helpline number?", a: "You can contact M&P customer service at (021) 111-667-000." },
      { q: "Does M&P offer same-day delivery?", a: "Yes, they have a 'Same Day' service available for shipments within the same city." },
      { q: "How long does M&P take for inter-city delivery?", a: "Typically, it takes 24-48 hours for delivery between major cities in Pakistan." },
      { q: "Is M&P tracking accurate?", a: "Yes, M&P has a very robust tracking system that provides reliable updates." },
      { q: "Does M&P handle international shipments?", a: "Yes, they have partnerships that allow them to ship and track parcels globally." },
      { q: "What are M&P office timings?", a: "Most M&P centers are open from 9:00 AM to 6:00 PM, Monday through Saturday." },
      { q: "Can I track M&P distribution shipments?", a: "Yes, their system covers both their courier and distribution arms." },
      { q: "What to do if my M&P tracking status isn't moving?", a: "Contact their helpline with your airway bill number for a detailed status check." },
      { q: "Does M&P provide cash on delivery (COD)?", a: "Yes, they offer COD services for corporate clients and e-commerce businesses." }
    ]
  },
  daewoo: {
      title: "Daewoo FastEx: Cargo Tracking and Booking Information",
    content: "If you need something moved across the country *today*, Daewoo FastEx is often the answer. By using their extensive bus network, they can move parcels much faster than traditional truck-based couriers. It's particularly popular for sending heavy cargo or electronics. You can choose to pick it up from a terminal or have it delivered to your door.",
      tips: ["Terminal-to-terminal can be a practical option for many routes.", "Bring your original CNIC when picking up from a terminal.", "Check shipment size and branch handling before sending large cargo."],
    faqs: [
      { q: "How to track Daewoo FastEx cargo?", a: "Enter the consignment number from your cargo receipt into our tracking tool." },
      { q: "What is the Daewoo FastEx helpline?", a: "You can call Daewoo Express at 111-007-007 for cargo inquiries." },
        { q: "How does Daewoo FastEx move cargo?", a: "Daewoo FastEx uses its own network and route structure for cargo movement, depending on the shipment type and destination." },
      { q: "Can I get door-to-door delivery with Daewoo?", a: "Yes, they offer both terminal-to-terminal and door-to-door delivery services." },
      { q: "What is a consignment number?", a: "It's the unique ID assigned to your cargo at the time of booking at a Daewoo terminal." },
      { q: "Do I need my CNIC to collect a Daewoo parcel?", a: "Yes, for security, the receiver must show their original CNIC at the terminal." },
      { q: "What are the Daewoo cargo terminal timings?", a: "Most terminals operate 24/7 for cargo booking and collection." },
      { q: "Can I send electronics via Daewoo FastEx?", a: "Yes, they are a popular choice for shipping TVs, laptops, and other appliances." },
      { q: "How long does terminal-to-terminal delivery take?", a: "It usually takes as long as the bus journey between the two cities, often just a few hours." },
      { q: "Is there a weight limit for Daewoo cargo?", a: "They can handle very heavy items, but it's best to check with the terminal for extremely large shipments." }
    ]
  },
  trax: {
    title: "Trax Logistics: Smart Shipping for Online Sellers",
      content: "Trax focuses on e-commerce logistics and last-mile delivery for online sellers. Their merchant tools and shipment updates are commonly used by businesses that need pickup, delivery, and return visibility in one place.",
    tips: ["Use their automated SMS feature to keep your customers happy.", "Their rider app is very efficient, making pickups quick and easy.", "The Trax dashboard gives you a great overview of your delivery success rate."],
    faqs: [
      { q: "How do I track my Trax parcel?", a: "Enter your Trax tracking ID (found in your booking SMS or email) into our portal." },
      { q: "What is Trax specialized in?", a: "They are specialists in e-commerce logistics and last-mile delivery in Pakistan." },
      { q: "How can I contact Trax support?", a: "You can reach them at (021) 111-872-911 or via their social media channels." },
      { q: "Does Trax offer cash on delivery (COD)?", a: "Yes, they have a very popular COD service with quick payment cycles for sellers." },
      { q: "How long does Trax take to deliver?", a: "Standard delivery is 24-48 hours in major cities and 3-5 days for remote areas." },
      { q: "What is the Trax merchant dashboard?", a: "It's a comprehensive tool for sellers to book orders, track shipments, and manage returns." },
        { q: "Is Trax tracking updated in real-time?", a: "Tracking updates appear when Trax scans and syncs the shipment in their system." },
      { q: "Can I track Trax parcels on my mobile?", a: "Yes, our portal is fully responsive and works perfectly on mobile browsers." },
      { q: "What to do if a Trax delivery is failed?", a: "Trax usually attempts delivery twice. You can contact their support to reschedule a third attempt." },
      { q: "Where does Trax deliver in Pakistan?", a: "They have a wide network covering hundreds of cities and towns across the country." }
    ]
  },
  blueex: {
    title: "BlueEx: The Pioneers of E-commerce Delivery",
    content: "BlueEx was one of the first companies to really focus on the e-commerce boom in Pakistan. They've been around for a while and have a deep understanding of the local market. If you're looking for a courier that knows the ins and outs of COD and last-mile delivery, BlueEx is a solid, experienced choice. Their tracking system is well-integrated and reliable.",
    tips: ["BlueEx is great for high-volume e-commerce shipping.", "Their customer support is very experienced in handling COD issues.", "Always ensure your tracking ID is correct before searching."],
    faqs: [
      { q: "How to track BlueEx shipments?", a: "Enter your tracking number (from your shipping email or receipt) into our search bar." },
      { q: "What is the BlueEx helpline?", a: "You can call BlueEx customer support at (021) 111-258-339." },
      { q: "Was BlueEx the first COD courier in Pakistan?", a: "Yes, they were among the pioneers who introduced dedicated COD services for e-commerce." },
      { q: "How long does BlueEx take for delivery?", a: "They typically deliver within 24-48 hours in major urban centers." },
      { q: "Does BlueEx offer international shipping?", a: "Yes, they provide international logistics solutions through their global partners." },
      { q: "What is the BlueEx tracking ID format?", a: "It's usually a numeric or alphanumeric code found on your booking confirmation." },
        { q: "Can I track BlueEx parcels in real-time?", a: "You can check the latest available BlueEx status here whenever their system posts a new update." },
      { q: "Does BlueEx have an app for sellers?", a: "Yes, they offer digital tools for merchants to manage their shipments and payments." },
      { q: "What to do if my BlueEx parcel is delayed?", a: "Contact their helpline with your tracking ID for an immediate update on the delay." },
      { q: "Is BlueEx reliable for expensive items?", a: "Yes, they are a trusted partner for many high-end retail brands in Pakistan." }
    ]
  }
};

type TrackingEvent = {
  status: string;
  location: string | null;
  timestamp: string | null;
  details?: string | null;
};

type ProgressStep = {
  label: string;
  active: boolean;
};

type ShipmentDetails = {
  agentReferenceNumber?: string | null;
  trackingCode?: string | null;
  origin?: string | null;
  destination?: string | null;
  bookingDate?: string | null;
  shipper?: string | null;
  consignee?: string | null;
  pieces?: string | null;
  signedForBy?: string | null;
  deliveryType?: string | null;
  reason?: string | null;
  senderAddress?: string | null;
  senderPhone?: string | null;
  receiverAddress?: string | null;
  receiverPhone?: string | null;
};

type TrackingResult = {
  courier: string;
  trackingNumber: string;
  success: boolean;
  status: string | null;
  location: string | null;
  timestamp: string | null;
  events: TrackingEvent[];
  error: string | null;
  strategy?: string | null;
  shipmentDetails?: ShipmentDetails | null;
  customerMessage?: string | null;
  progressSteps?: ProgressStep[];
};

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const API_BASE_URL = (viteEnv?.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

function parseTrackingIds(input: string): string[] {
  return input
    .split(/[\s,]+/)
    .map((id) => id.trim())
    .filter((id) => id !== '');
}

async function apiRequest<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data as T;
}

function SummaryDetail({ label, value }: { label: string; value?: string | null }) {
  if (!value) {
    return null;
  }

  return (
    <div className="grid grid-cols-[112px_minmax(0,1fr)] items-start gap-3 border-b border-slate-100 py-3 text-base font-medium">
      <span className="text-slate-400 leading-tight">{label}</span>
      <span className="text-right font-bold text-slate-900 leading-tight">{value}</span>
    </div>
  );
}

function ProgressStrip({ steps }: { steps?: ProgressStep[] }) {
  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={`${step.label}-${index}`}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black ${step.active ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-900'}`}>
              {index + 1}
            </div>
            <span className={`text-base font-semibold ${step.active ? 'text-slate-900' : 'text-slate-500'}`}>{step.label}</span>
          </div>
          {index < steps.length - 1 ? <div className="hidden md:block h-px w-8 bg-amber-300" /> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function DaewooDetailRow({ label, value, accent = false }: { label: string; value?: string | null; accent?: boolean }) {
  return (
    <div className="flex items-start gap-4 text-base md:text-lg">
      <span className="w-36 shrink-0 text-slate-500">{label}</span>
      <span className={`font-bold ${accent ? 'text-rose-500' : 'text-slate-900'}`}>{value || 'N/A'}</span>
    </div>
  );
}

function DaewooTrackingCard({ result, index }: { result: TrackingResult; index: number }) {
  return (
    <div className="p-6 md:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 font-bold font-display">
              {index + 1}
            </div>
            <div className="min-w-0">
              <span className="font-mono font-bold text-slate-900 text-lg block break-all">{result.trackingNumber}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{result.courier}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-emerald-600 font-display mb-1">
              {result.status || 'Status unavailable'}
            </p>
            {result.customerMessage ? (
              <p className="text-base text-slate-600 font-medium leading-relaxed mb-0">{result.customerMessage}</p>
            ) : null}
          </div>
        </div>

        <div className="w-full lg:w-[340px] rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
          <SummaryDetail label="Current Status" value={result.status} />
          <SummaryDetail label="Current Location" value={result.location} />
          <SummaryDetail label="Reason" value={result.shipmentDetails?.reason || result.customerMessage} />
          <SummaryDetail label="Delivery Type" value={result.shipmentDetails?.deliveryType} />
          <SummaryDetail label="Received By" value={result.shipmentDetails?.signedForBy} />
          <SummaryDetail label="Date" value={result.timestamp} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-6 md:p-7 space-y-4">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-display">Shipment Details</h3>
          <div className="space-y-3">
            <DaewooDetailRow label="Consignment No:" value={result.shipmentDetails?.agentReferenceNumber} accent />
            <DaewooDetailRow label="Tracking Code:" value={result.shipmentDetails?.trackingCode} />
            <DaewooDetailRow label="Consignee:" value={result.shipmentDetails?.consignee} />
            <DaewooDetailRow label="Origin:" value={result.shipmentDetails?.origin} />
            <DaewooDetailRow label="Destination:" value={result.shipmentDetails?.destination} />
            <DaewooDetailRow label="Booking Date:" value={result.shipmentDetails?.bookingDate} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-6 md:p-7 space-y-4">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-display">Sender Detail</h3>
          <div className="space-y-3">
            <DaewooDetailRow label="Name:" value={result.shipmentDetails?.shipper} accent />
            <DaewooDetailRow label="Origin:" value={result.shipmentDetails?.origin} />
            <DaewooDetailRow label="Address:" value={result.shipmentDetails?.senderAddress} />
            <DaewooDetailRow label="Phone No:" value={result.shipmentDetails?.senderPhone} />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50/80 p-6 md:p-7 space-y-4 lg:col-start-2">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 font-display">Receiver Detail</h3>
          <div className="space-y-3">
            <DaewooDetailRow label="Name:" value={result.shipmentDetails?.consignee} accent />
            <DaewooDetailRow label="Origin:" value={result.shipmentDetails?.destination} />
            <DaewooDetailRow label="Address:" value={result.shipmentDetails?.receiverAddress} />
            <DaewooDetailRow label="Phone No:" value={result.shipmentDetails?.receiverPhone} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PakistanPostTrackingCard({ result, index }: { result: TrackingResult; index: number }) {
  return (
    <div className="p-6 md:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 min-w-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold font-display">
              {index + 1}
            </div>
            <div className="min-w-0">
              <span className="font-mono font-bold text-slate-900 text-lg block break-all">{result.trackingNumber}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{result.courier}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-emerald-600 font-display mb-1">
              {result.status || 'Status unavailable'}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[340px] rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
          <SummaryDetail label="Delivery Office" value={result.shipmentDetails?.destination || result.location} />
          <SummaryDetail label="Updated" value={result.timestamp} />
          <SummaryDetail label="Booking Office" value={result.shipmentDetails?.origin} />
        </div>
      </div>

      {result.events.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-xl font-black text-slate-900 font-display">Shipment Information</h4>
          <div className="space-y-1">
            {result.events.map((event, eventIndex) => (
              <div key={`${result.trackingNumber}-${eventIndex}`} className="grid grid-cols-[110px_20px_minmax(0,1fr)] gap-4 items-start py-2">
                <div className="text-base font-bold text-slate-800 leading-tight">
                  <div>{event.timestamp || 'Time unavailable'}</div>
                  {event.location ? <div className="text-sm text-slate-400 mt-0.5 leading-tight">{event.location}</div> : null}
                </div>
                <div className="flex justify-center pt-1">
                  <div className={`w-6 h-6 rounded-full border ${eventIndex === 0 ? 'bg-amber-400 border-amber-400' : 'bg-white border-amber-400'}`} />
                </div>
                <div className="pt-0.5">
                  <div className="font-semibold text-slate-900 leading-snug">{event.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TrackingResultCard({ result, index }: { result: TrackingResult; index: number }) {
  if (!result.success) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 font-bold font-display">
            {index + 1}
          </div>
          <div className="min-w-0">
            <span className="font-mono font-bold text-slate-900 text-lg block break-all">{result.trackingNumber}</span>
            <span className="text-sm font-bold text-rose-500 uppercase tracking-widest">Tracking error</span>
          </div>
        </div>
        <p className="mt-4 text-base font-medium text-rose-500">{result.error || 'Tracking failed.'}</p>
      </div>
      );
    }

    if (result.courier.toLowerCase() === 'daewoo') {
      return <DaewooTrackingCard result={result} index={index} />;
    }

  if (result.courier.toLowerCase() === 'pakistan post') {
    return <PakistanPostTrackingCard result={result} index={index} />;
  }

  return (
      <div className="p-6 md:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-bold font-display">
              {index + 1}
            </div>
            <div className="min-w-0">
              <span className="font-mono font-bold text-slate-900 text-lg block break-all">{result.trackingNumber}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{result.courier}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-emerald-600 font-display mb-1">
              {result.status || 'Status unavailable'}
            </p>
            {result.customerMessage ? (
              <p className="text-base text-slate-600 font-medium leading-relaxed mb-0">{result.customerMessage}</p>
            ) : null}
          </div>
          <ProgressStrip steps={result.progressSteps} />
        </div>

          <div className="w-full lg:w-[340px] rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
            <SummaryDetail
              label={result.courier.toLowerCase() === 'pakistan post' ? 'Delivery Office' : 'Location'}
              value={result.courier.toLowerCase() === 'pakistan post' ? result.shipmentDetails?.destination || result.location : result.location}
            />
            <SummaryDetail label="Updated" value={result.timestamp} />
            <SummaryDetail
              label={result.courier.toLowerCase() === 'pakistan post' ? 'Booking Office' : 'Origin'}
              value={result.shipmentDetails?.origin}
            />
            <SummaryDetail
              label={result.courier.toLowerCase() === 'pakistan post' ? 'Delivery Office' : 'Destination'}
              value={result.shipmentDetails?.destination}
            />
            <SummaryDetail label="Booking Date" value={result.shipmentDetails?.bookingDate} />
            <SummaryDetail label="Reference No." value={result.shipmentDetails?.agentReferenceNumber} />
            <SummaryDetail label="Shipper" value={result.shipmentDetails?.shipper} />
            <SummaryDetail label="Consignee" value={result.shipmentDetails?.consignee} />
            <SummaryDetail label="Signed For By" value={result.shipmentDetails?.signedForBy} />
            <SummaryDetail label="Pieces" value={result.shipmentDetails?.pieces} />
          </div>
        </div>

      {result.events.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-xl font-black text-slate-900 font-display">Shipment Information</h4>
          <div className="space-y-3">
            {result.events.map((event, eventIndex) => (
              <div key={`${result.trackingNumber}-${eventIndex}`} className="grid grid-cols-[120px_24px_minmax(0,1fr)] gap-4 items-start py-3">
                <div className="text-base font-bold text-slate-800">
                  <div>{event.timestamp || 'Time unavailable'}</div>
                  {event.location ? <div className="text-sm text-slate-400 mt-1">{event.location}</div> : null}
                </div>
                <div className="flex justify-center">
                  <div className={`w-6 h-6 rounded-full border ${eventIndex === 0 ? 'bg-amber-400 border-amber-400' : 'bg-white border-amber-400'}`} />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{event.status}</div>
                  {event.details ? <div className="text-base text-slate-500 mt-1">{event.details}</div> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TrackingPage = () => {
  const { courierSlug } = useParams<{ courierSlug: string }>();
  const navigate = useNavigate();
  const [trackingIds, setTrackingIds] = React.useState('');
  const [isTracking, setIsTracking] = React.useState(false);
  const [results, setResults] = React.useState<TrackingResult[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!courierSlug) {
      return;
    }

    const canonicalSlug = COURIER_SLUG_ALIASES[courierSlug];
    if (canonicalSlug) {
      navigate(`/${canonicalSlug}`, { replace: true });
    }
  }, [courierSlug, navigate]);

  const courier = COURIERS.find(c => c.slug === courierSlug);
  
  if (!courier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Courier Not Found</h1>
          <Link to="/" className="text-green-600 font-bold">Back to Home</Link>
        </div>
      </div>
    );
  }

  const guide = COURIER_GUIDES[courier.id];
  const pageMeta = COURIER_PAGE_META[courier.id];
  const longFormSections = COURIER_LONG_FORM[courier.id] || [];
  const relatedArticle = BLOG_ARTICLE_BY_COURIER_ID[courier.id];

  const clearTracking = () => {
    setTrackingIds('');
    setResults([]);
    setError(null);
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResults([]);

      const ids = parseTrackingIds(trackingIds);
    if (ids.length === 0) {
      setError('Enter at least one tracking number.');
      return;
    }
    if (ids.length > 20) {
      setError('Maximum 20 tracking IDs allowed at once.');
      return;
    }
    
    setIsTracking(true);
    try {
      if (ids.length === 1) {
        const result = await apiRequest<TrackingResult>('/track', {
          courier: courier.id,
          trackingNumber: ids[0],
          autoDetect: false,
        });
        setResults([result]);
      } else {
        const bulkResults = await apiRequest<TrackingResult[]>('/bulk-track', {
          courier: courier.id,
          trackingNumbers: ids,
          autoDetect: false,
        });
        setResults(bulkResults);
      }
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Tracking failed.');
    } finally {
      setIsTracking(false);
    }
  };

  return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-5xl mx-auto px-4 py-24 md:py-32"
      >
        <Seo meta={pageMeta} pageName={`${courier.name} Tracking`} faqs={guide?.faqs || []} />
        <button 
          onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-10 transition-colors group font-bold font-display"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Back to all couriers
      </button>

      <div className="glass rounded-[2rem] md:rounded-[3rem] p-5 sm:p-8 md:p-16 card-shadow-hover relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 mb-12 md:mb-16 relative z-10">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform overflow-hidden border border-black/5"
              style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
            >
              <img src={courier.logo} alt={`${courier.name} logo`} className="w-full h-full object-contain p-3" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display mb-2">{courier.name} Tracking</h1>
              <p className="text-slate-500 font-medium">Bulk Tracking Portal • Up to 20 Parcels</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-green-700 bg-green-500/10 border border-green-500/20 px-5 py-3 rounded-2xl text-sm sm:text-base font-bold font-display">
            <ShieldCheck size={20} />
            Verified Official Data
          </div>
        </div>

        <form onSubmit={handleTrack} className="space-y-8 relative z-10">
          <div className="relative group">
            <textarea 
                placeholder="Enter Tracking IDs (separated by line, comma, or space, max 20)&#10;Example:&#10;123456789&#10;987654321"
              value={trackingIds}
              onChange={(e) => setTrackingIds(e.target.value)}
              rows={6}
              className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] md:rounded-[2rem] px-5 sm:px-6 md:px-8 py-5 md:py-8 text-base sm:text-lg md:text-xl font-medium focus:outline-none focus:border-green-500 focus:bg-white transition-all resize-none font-mono placeholder:text-slate-300"
            />
            <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end md:absolute md:bottom-6 md:right-6 md:mt-0">
              <button
                type="button"
                onClick={clearTracking}
                disabled={isTracking && trackingIds.length === 0}
                className="bg-white text-slate-700 px-6 py-4 md:py-5 rounded-2xl font-black border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all disabled:opacity-50 shadow-lg shadow-slate-100 font-display text-base"
              >
                Clear
              </button>
              <button 
                type="submit"
                disabled={isTracking}
                className="bg-slate-900 text-white px-8 sm:px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black hover:bg-green-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-slate-200 hover:shadow-green-200 font-display text-base sm:text-lg"
              >
                {isTracking ? 'Processing...' : 'Track Now'}
                <Search size={22} />
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50 px-6 py-4 text-base font-semibold text-rose-500 relative z-10">
            {error}
          </div>
        )}

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 space-y-6 relative z-10"
          >
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-2xl font-black text-slate-900 font-display">Tracking Results</h3>
              <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest font-display">
                {results.length} Parcels Found
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {results.map((result, idx) => (
                <motion.div 
                  key={`${result.courier}-${result.trackingNumber}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <TrackingResultCard result={result} index={idx} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Courier Specific Guide Section */}
        {guide && (
          <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-slate-100 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
              <div className="lg:col-span-2 space-y-12">
                <div className="space-y-8">
                  <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">
                    {guide.title}
                  </h2>
                  {relatedArticle ? (
                    <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100">
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-green-600 font-display">Related blog guide</div>
                          <h3 className="text-2xl font-black text-slate-900 font-display leading-tight">{relatedArticle.title}</h3>
                          <p className="text-base text-slate-500 leading-relaxed font-medium">{relatedArticle.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {[relatedArticle.primaryKeyword, ...relatedArticle.secondaryKeywords.slice(0, 2)].map((keyword) => (
                              <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            to={`/blog/${relatedArticle.slug}`}
                            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-200 transition-colors hover:bg-green-600 font-display"
                          >
                            Read Full Blog Guide
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <p className="text-lg text-slate-500 leading-relaxed font-medium">
                    {guide.content}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-4 font-display">Tracking Format</h4>
                      <p className="text-base text-slate-500 font-medium">
                        Most {courier.name} tracking numbers are numeric or alphanumeric. Check your booking receipt or SMS for the correct ID.
                      </p>
                    </div>
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                      <h4 className="font-black text-slate-900 mb-4 font-display">Estimated Delivery</h4>
                      <p className="text-base text-slate-500 font-medium">
                        Standard delivery takes 24-48 hours between major cities, while remote areas may take 3-5 working days.
                      </p>
                    </div>
                  </div>
                  </div>

                  {longFormSections.length > 0 ? (
                    <div className="space-y-8">
                      {longFormSections.map((section, sectionIndex) => (
                        <div key={`${courier.id}-seo-section-${sectionIndex}`} className="space-y-4">
                          <h3 className="text-2xl font-black text-slate-900 font-display leading-tight">
                            {section.heading}
                          </h3>
                          <div className="space-y-4">
                            {section.paragraphs.map((paragraph, paragraphIndex) => (
                              <p
                                key={`${courier.id}-seo-section-${sectionIndex}-paragraph-${paragraphIndex}`}
                                className="text-lg text-slate-500 leading-relaxed font-medium"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Courier Specific FAQs */}
                <div className="space-y-8">
                  <h3 className="text-2xl font-black text-slate-900 font-display">Common Questions about {courier.name}</h3>
                  <div className="space-y-3">
                    {guide.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                        <button 
                          onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                          className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white transition-colors"
                        >
                          <span className="font-bold text-slate-900 font-display text-base">{faq.q}</span>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-green-600 transition-transform ${openFaqIdx === idx ? 'rotate-90' : ''}`}>
                            <ChevronRight size={14} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {openFaqIdx === idx && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-6 pb-4 text-sm text-slate-500 leading-relaxed font-medium"
                            >
                              {faq.a}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-green-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-green-200">
                  <h3 className="text-xl font-black mb-6 font-display">Expert Tracking Tips</h3>
                  <ul className="space-y-5">
                    {guide.tips.map((tip, i) => (
                      <li key={i} className="flex gap-3 text-base font-bold leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100">
                  <h3 className="text-2xl font-black text-slate-900 font-display">More courier guides</h3>
                  <div className="mt-6 space-y-4">
                    {BLOG_ARTICLES.filter((item) => item.courierId !== courier.id).slice(0, 3).map((item) => {
                      const linkedCourier = COURIERS.find((courierItem) => courierItem.id === item.courierId);
                      return (
                        <Link key={item.slug} to={`/blog/${item.slug}`} className="block rounded-2xl bg-slate-50 px-5 py-4 transition-colors hover:bg-green-50">
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-green-600 font-display">
                            {linkedCourier?.name || 'Courier guide'}
                          </div>
                          <div className="mt-2 text-lg font-black text-slate-900 font-display leading-snug">{item.title}</div>
                          <div className="mt-2 text-sm text-slate-500 font-medium">{item.readTime}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          <div className="group p-8 bg-slate-50/50 rounded-3xl border border-transparent hover:border-green-100 hover:bg-white transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Clock className="text-green-600" size={24} />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-3 font-display">24/7 Live Status</h3>
              <p className="text-base text-slate-500 leading-relaxed font-medium">Check the latest available tracking status for your shipments in one place.</p>
          </div>
          <div className="group p-8 bg-slate-50/50 rounded-3xl border border-transparent hover:border-green-100 hover:bg-white transition-all duration-300">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <Package className="text-green-600" size={24} />
            </div>
            <h3 className="font-black text-slate-900 text-lg mb-3 font-display">Secure Portal</h3>
              <p className="text-base text-slate-500 leading-relaxed font-medium">Tracking requests are used to fetch shipment status for the current session.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const faqs = [
    { q: "How do I track my TCS parcel?", a: "To track your TCS parcel, select TCS from our homepage, enter your tracking number, and click 'Track Now'. You can track up to 20 parcels at once." },
    { q: "What is the tracking format for Leopards Courier?", a: "Leopards tracking numbers are usually numeric or alphanumeric. You can find them on your booking receipt." },
    { q: "How long does Pakistan Post take for delivery?", a: "Pakistan Post delivery times vary by service (UMS, Registered Post, etc.), typically ranging from 2 to 7 working days." },
    { q: "Can I track multiple parcels at once?", a: "Yes! Our system supports bulk tracking for up to 20 parcels simultaneously for any supported courier." },
    { q: "What if my tracking ID is not working?", a: "Ensure you've entered the ID correctly. If it still doesn't work, wait 24 hours for the system to update or contact the courier's support." },
    { q: "How to contact TCS customer support?", a: "You can contact TCS support at their helpline (021) 111-123-456 or via their official website." },
    { q: "Are tracking updates available for all couriers?", a: "We show the latest available tracking updates for TCS, Leopards, Pakistan Post, PostEx, M&P, Daewoo, Trax, and BlueEx when their systems return data." },
    { q: "What is PostEx and how to track it?", a: "PostEx is a modern logistics provider for e-commerce. You can track your PostEx shipments using their specific ID on our portal." },
    { q: "How to track Daewoo FastEx cargo?", a: "Select Daewoo from our list and enter your consignment number to check the latest available booking and tracking details." },
    { q: "What is the difference between domestic and international tracking?", a: "Domestic tracking is for within Pakistan, while international tracking follows your parcel across borders until it reaches the destination." },
    { q: "What are the standard delivery timings in Pakistan?", a: "Most couriers deliver between 9:00 AM and 6:00 PM, Monday through Saturday." },
    { q: "How to find the nearest TCS or Leopards center?", a: "You can use the official branch locator on the respective courier's website for the most accurate locations." },
    { q: "What is M&P tracking?", a: "M&P (Muller & Phipps) is a major logistics player. Their tracking allows you to monitor distribution and courier shipments." },
    { q: "How to track Trax parcels for e-commerce?", a: "Trax is specialized in e-commerce. Use your Trax tracking ID on our dedicated Trax page for live status." },
    { q: "Is there a mobile app for PakTrack?", a: "Currently, we offer a fully responsive web portal that works perfectly on all mobile devices." },
    { q: "How to track BlueEx shipments?", a: "BlueEx offers advanced e-commerce logistics. Enter your tracking number on our BlueEx page to see your parcel's journey." },
    { q: "What to do if a parcel is delayed?", a: "If your parcel is delayed beyond the expected date, contact the courier's helpline with your tracking ID for an investigation." },
    { q: "Are there any hidden charges for using this tracking portal?", a: "No, our tracking service is completely free for all users." },
    { q: "How secure is my tracking data?", a: "Your tracking number is used to request shipment status from the connected courier source." },
    { q: "Can I track international shipments arriving in Pakistan?", a: "Yes, once the international shipment is handed over to a local partner like TCS or Pakistan Post, you can track it here." }
  ];

  return (
      <div id="faqs" className="mt-32 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4 font-display">Frequently Asked Questions</h2>
        <p className="text-slate-500 font-medium">Everything you need to know about tracking in Pakistan.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden hover:border-green-200 transition-colors">
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
              <span className="font-bold text-slate-900 font-display text-lg">{faq.q}</span>
              <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-green-600 transition-transform ${openIdx === idx ? 'rotate-90 bg-green-50' : ''}`}>
                <ChevronRight size={18} />
              </div>
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-6 text-slate-500 leading-relaxed font-medium"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  const [reviews, setReviews] = React.useState<Array<{
    name: string;
    role: string;
    quote: string;
    rating: number;
    createdAt: string;
  }>>([]);
  const [name, setName] = React.useState('');
  const [role, setRole] = React.useState('');
  const [quote, setQuote] = React.useState('');
  const [rating, setRating] = React.useState(5);

  React.useEffect(() => {
    const stored = window.localStorage.getItem('paktrack-reviews');
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setReviews(parsed);
      }
    } catch {
      window.localStorage.removeItem('paktrack-reviews');
    }
  }, []);

  const submitReview = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !quote.trim()) {
      return;
    }

    const nextReview = {
      name: name.trim(),
      role: role.trim() || 'PakTrack user',
      quote: quote.trim(),
      rating,
      createdAt: new Date().toISOString(),
    };

    const nextReviews = [nextReview, ...reviews].slice(0, 12);
    setReviews(nextReviews);
    window.localStorage.setItem('paktrack-reviews', JSON.stringify(nextReviews));
    setName('');
    setRole('');
    setQuote('');
    setRating(5);
  };

  return (
      <div id="reviews" className="mt-32 max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-4 font-display">Share your review</h2>
        <p className="text-slate-500 font-medium text-lg">This section only shows real reviews submitted by visitors on this device.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8 items-start">
        <form onSubmit={submitReview} className="glass rounded-[2.5rem] p-8 card-shadow border border-slate-100 space-y-5">
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display mb-2">Leave a website review</h3>
            <p className="text-slate-500 font-medium leading-relaxed">Tell visitors what you think about the PakTrack experience.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-widest font-display">Your name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-widest font-display">Role or city</label>
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Seller, buyer, support agent, Lahore..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-widest font-display">Rating</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`w-12 h-12 rounded-2xl border text-xl transition-colors ${rating >= value ? 'border-amber-300 bg-amber-50 text-amber-500' : 'border-slate-200 bg-white text-slate-300'}`}
                  aria-label={`Rate ${value} stars`}
                >
                  ?
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-widest font-display">Review</label>
            <textarea
              value={quote}
              onChange={(event) => setQuote(event.target.value)}
              rows={5}
              placeholder="Share your experience with the website..."
              className="w-full rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 text-base text-slate-900 resize-none focus:outline-none focus:border-green-500"
            />
          </div>

          <button type="submit" className="bg-slate-900 text-white px-7 py-4 rounded-2xl text-base font-black hover:bg-green-600 transition-all shadow-xl shadow-slate-200 hover:shadow-green-200 font-display">
            Submit Review
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.length === 0 ? (
            <div className="md:col-span-2 glass rounded-[2.5rem] p-10 card-shadow border border-dashed border-slate-200 text-center">
              <h3 className="text-2xl font-black text-slate-900 font-display mb-3">No reviews yet</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Be the first person to share feedback about the website.</p>
            </div>
          ) : (
            reviews.map((review, idx) => (
              <motion.div
                key={`${review.createdAt}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-[2.5rem] p-8 card-shadow border border-slate-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-green-50 rounded-full -mr-10 -mt-10" />
                <div className="relative z-10 space-y-5">
                  <div className="flex items-center gap-1 text-amber-400 text-xl">
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <span key={starIndex}>?</span>
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed text-lg font-medium">"{review.quote}"</p>
                  <div>
                    <div className="font-display text-xl font-black text-slate-900">{review.name}</div>
                    <div className="text-base text-slate-500 font-medium">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const SEOContent = () => {
  return (
      <div id="guides" className="mt-32 max-w-5xl mx-auto px-4">
      <div className="glass rounded-[3rem] p-10 md:p-16 border border-slate-100">
        <h2 className="text-4xl font-black text-slate-900 mb-10 font-display">Courier Tracking Guide for Pakistan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-slate-600 leading-relaxed">
          <div className="space-y-8">
            <p className="text-lg font-medium">
              Use <span className="text-green-600 font-bold">PakTrack</span> as a starting point for courier tracking in Pakistan, then move to the exact courier page that matches your shipment.
            </p>
            <p>
              The homepage works as a directory for <strong>TCS</strong>, <strong>Leopards Courier</strong>, <strong>Pakistan Post</strong>, <strong>PostEx</strong>, <strong>M&amp;P</strong>, <strong>Daewoo</strong>, <strong>Trax</strong>, and <strong>BlueEx</strong>.
            </p>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 font-display mb-4">Why Use Bulk Tracking?</h3>
              <p className="text-base font-medium">
                If you handle multiple shipments, you can paste up to <strong>20 tracking IDs</strong> in one request. This is useful for store owners, support teams, dispatch staff, and anyone checking several parcels together.
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-xl font-black text-slate-900 font-display">Couriers We Support</h3>
            <ul className="space-y-4">
              {[
                { name: 'TCS Tracking', desc: 'Often used for documents, parcels, and intercity courier deliveries.' },
                { name: 'Leopards Courier', desc: 'Commonly used for COD orders and domestic parcel movement.' },
                { name: 'Pakistan Post', desc: 'Useful for UMS, registered post, office mail, and article handling.' },
                { name: 'PostEx, M&P, Daewoo, Trax, and BlueEx', desc: 'Cover e-commerce delivery, cargo, business shipments, and route-based movement.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block">{item.name}</strong>
                    <span className="text-base font-medium">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-green-600 p-8 rounded-3xl shadow-xl shadow-green-100 text-white">
              <h4 className="font-black mb-3 font-display text-lg">Tracking Tip</h4>
              <p className="text-base font-medium opacity-90 leading-relaxed">
                Double-check the shipment number on the receipt or delivery message and make sure you open the correct courier page before running the search.
              </p>
            </div>
          </div>
          </div>

          <div className="mt-16 space-y-12">
            {HOME_LONG_FORM.map((section, sectionIndex) => (
              <div key={`home-seo-section-${sectionIndex}`} className="space-y-5">
                <h3 className="text-2xl font-black text-slate-900 font-display leading-tight">{section.heading}</h3>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={`home-seo-section-${sectionIndex}-paragraph-${paragraphIndex}`}
                      className="text-lg text-slate-500 leading-relaxed font-medium"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

const HomePage = () => {
  return (
      <div className="pt-32 md:pt-40 pb-20 md:pb-24">
        <Seo meta={HOME_PAGE_META} pageName="Home" />
        <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/10 blur-[120px] rounded-full -z-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-widest font-display">Courier Directory</span>
          </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 mb-6 md:mb-8 tracking-tight font-display leading-[1.05] md:leading-[1.1]"
            >
              Track your courier in Pakistan <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">online.</span>
            </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12"
            >
              Choose the right courier page, read the guide, and use one homepage for <strong>courier tracking in Pakistan</strong> with support for <strong>up to 20 parcels</strong> in one request.
            </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-slate-400" size={20} />
                <span className="text-base font-bold text-slate-500 font-display">Clear Courier Pages</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-slate-400" size={20} />
                <span className="text-base font-bold text-slate-500 font-display">Bulk Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="text-slate-400" size={20} />
                <span className="text-base font-bold text-slate-500 font-display">Pakistan Delivery Coverage</span>
              </div>
          </motion.div>
        </div>

          <div id="couriers" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {COURIERS.map((courier, idx) => (
            <motion.div
              key={courier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Link
                to={`/${courier.slug}`}
                className="relative glass rounded-[2.5rem] p-10 card-shadow hover:card-shadow-hover cursor-pointer transition-all duration-300 overflow-hidden block"
                aria-label={`Open ${courier.name} tracking page`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-green-50 transition-colors" />
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:rotate-12 transition-transform relative z-10 overflow-hidden border border-black/5"
                  style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
                >
                  <img src={courier.logo} alt={`${courier.name} logo`} className="w-full h-full object-contain p-2.5" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 font-display relative z-10">{courier.name}</h3>
                <p className="text-base text-slate-500 mb-8 leading-relaxed relative z-10">{courier.description}</p>
                <div className="flex items-center text-green-600 font-bold text-base gap-2 font-display relative z-10 group-hover:translate-x-2 transition-transform">
                  Track Now <ChevronRight size={18} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <SEOContent />
        <ReviewsSection />
        <FAQSection />
      </div>
    </div>
  );
};

const BlogIndexPage = () => {
  return (
    <div className="pt-32 md:pt-40 pb-20 md:pb-24">
      <Seo meta={BLOG_INDEX_META} pageName="Blog" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mb-16">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-widest text-slate-500 font-display">
            Blog
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.05]">
            Courier tracking guides for Pakistan
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">
            Read simple, search-friendly guides for each courier, learn what their tracking updates mean, and jump to the right tracking page when you are ready.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_ARTICLES.map((article, idx) => {
            const courier = COURIERS.find((item) => item.id === article.courierId);
            return (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <Link
                  to={`/blog/${article.slug}`}
                  className="block rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100 transition-all hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="flex items-center gap-4">
                    {courier ? (
                      <div
                        className="h-14 w-14 overflow-hidden rounded-2xl border border-black/5 p-2"
                        style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
                      >
                        <img src={courier.logo} alt={`${courier.name} logo`} className="h-full w-full object-contain" />
                      </div>
                    ) : null}
                    <div>
                      <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600 font-display">{courier?.name || 'Courier guide'}</div>
                      <div className="text-sm text-slate-400 font-medium">{article.readTime}</div>
                    </div>
                  </div>
                  <h2 className="mt-8 text-2xl font-black text-slate-900 font-display leading-tight">{article.title}</h2>
                  <p className="mt-4 text-base text-slate-500 leading-relaxed font-medium">{article.excerpt}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[article.primaryKeyword, ...article.secondaryKeywords.slice(0, 2)].map((keyword) => (
                      <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-base font-black text-green-600 font-display">
                    Read article
                    <ChevronRight size={18} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 rounded-[3rem] border border-slate-100 bg-white p-10 md:p-14 shadow-xl shadow-slate-100">
          {BLOG_INTRO_SECTIONS.map((section, index) => (
            <div key={section.heading} className={index === 0 ? 'space-y-5' : 'mt-12 space-y-5'}>
              <h2 className="text-3xl font-black text-slate-900 font-display">{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.heading}-${paragraphIndex}`} className="text-lg text-slate-500 leading-relaxed font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogArticlePage = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const article = articleSlug ? BLOG_ARTICLE_BY_SLUG[articleSlug] : undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 font-display">Article not found</h1>
          <p className="mt-4 text-lg text-slate-500 font-medium">The blog guide you opened is not available.</p>
          <Link to="/blog" className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-white font-black font-display">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const courier = COURIERS.find((item) => item.id === article.courierId);
  const articleSections = [...article.sections, ...(BLOG_SUPPLEMENTAL_SECTIONS[article.courierId] || [])];
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: `https://www.paktrack.pk${article.meta.canonicalPath}`,
    mainEntityOfPage: `https://www.paktrack.pk${article.meta.canonicalPath}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PakTrack',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.paktrack.pk/websitelogo.png',
      },
    },
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
  };

  return (
    <div className="pt-32 md:pt-40 pb-20 md:pb-24">
      <Seo meta={article.meta} pageName={article.title} faqs={article.faqs} extraSchemas={[articleSchema]} />
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-green-600 font-display">
            <ArrowLeft size={16} />
            Back to blog
          </Link>
          <div className="mt-6 flex items-center gap-4">
            {courier ? (
              <div
                className="h-16 w-16 overflow-hidden rounded-2xl border border-black/5 p-2"
                style={{ backgroundColor: courier.logoBg, border: courier.logoBorder || undefined }}
              >
                <img src={courier.logo} alt={`${courier.name} logo`} className="h-full w-full object-contain" />
              </div>
            ) : null}
            <div>
              <div className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 font-display">{courier?.name || 'Courier guide'}</div>
              <div className="text-sm text-slate-500 font-medium">{article.readTime}</div>
            </div>
          </div>
          <div className="mt-6 rounded-[2rem] border border-slate-100 bg-white px-5 sm:px-6 py-5 shadow-lg shadow-slate-100">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-display">Author</div>
                <div className="mt-2 text-base font-black text-slate-900 font-display">{article.authorName}</div>
                <div className="text-sm text-slate-500 font-medium">{article.authorRole}</div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-display">Published</div>
                <div className="mt-2 text-base font-black text-slate-900 font-display">{article.publishedAt}</div>
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 font-display">Last updated</div>
                <div className="mt-2 text-base font-black text-slate-900 font-display">{article.updatedAt}</div>
              </div>
            </div>
          </div>
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.05]">
            {article.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">{article.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[article.primaryKeyword, ...article.secondaryKeywords].map((keyword) => (
              <span key={keyword} className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="rounded-[2rem] md:rounded-[3rem] border border-slate-100 bg-white p-6 sm:p-8 md:p-14 shadow-xl shadow-slate-100">
            <div className="space-y-10">
              <section className="space-y-5">
                <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">{article.excerpt}</p>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  This guide is written to help users understand the courier in plain language, use the right tracking number, and make sense of the latest shipment result without guessing. It focuses on the real questions people ask when they search for this courier, not on filler text.
                </p>
              </section>

              <section className="space-y-5">
                <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">Key points before you track</h2>
                <ul className="space-y-4">
                  {article.takeaways.map((item) => (
                    <li key={item} className="flex gap-3 text-lg text-slate-600 leading-relaxed font-medium">
                      <div className="mt-2 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {articleSections.map((section, sectionIndex) => (
                <section key={section.heading} className="space-y-5">
                  <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={`${section.heading}-${paragraphIndex}`} className="text-lg text-slate-600 leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <section className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">Frequently asked questions</h2>
                <div className="space-y-6">
                  {article.faqs.map((faq) => (
                    <div key={faq.q} className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 font-display leading-tight">{faq.q}</h3>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </article>

          <aside className="space-y-6 md:space-y-8">
            {courier ? (
              <div className="rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
                <h3 className="text-2xl font-black text-slate-900 font-display">Open the tracker</h3>
                <p className="mt-3 text-base text-slate-500 leading-relaxed font-medium">
                  Ready to check the live shipment? Open the dedicated {courier.name} tracking page.
                </p>
                <Link
                  to={`/${courier.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-white font-black font-display shadow-lg shadow-green-100"
                >
                  Go to {courier.name} tracking
                  <ChevronRight size={16} />
                </Link>
              </div>
            ) : null}

            <div className="rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
              <h3 className="text-2xl font-black text-slate-900 font-display">More courier guides</h3>
              <div className="mt-6 space-y-4">
                {BLOG_ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 4).map((item) => (
                  <Link key={item.slug} to={`/blog/${item.slug}`} className="block rounded-2xl bg-slate-50 px-5 py-4 transition-colors hover:bg-green-50">
                    <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600 font-display">
                      {COURIERS.find((courierItem) => courierItem.id === item.courierId)?.name || 'Courier'}
                    </div>
                    <div className="mt-2 text-lg font-black text-slate-900 font-display leading-snug">{item.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const StaticPage = () => {
  const location = useLocation();
  const pageSlug = location.pathname.replace(/^\//, '');
  const page = STATIC_PAGE_BY_SLUG[pageSlug];

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 font-display">Page not found</h1>
          <p className="mt-4 text-lg text-slate-500 font-medium">The page you opened is not available.</p>
          <Link to="/" className="mt-8 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-white font-black font-display">
            Back to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-20 md:pb-24">
      <Seo meta={page.meta} pageName={page.pageName} faqs={page.faqs || []} />
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-green-600 font-display">
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="mt-6 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-slate-500 font-display">
            {page.eyebrow}
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight font-display leading-[1.05]">
            {page.heroTitle}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed font-medium">{page.intro}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[2rem] md:rounded-[3rem] border border-slate-100 bg-white p-6 sm:p-8 md:p-14 shadow-xl shadow-slate-100">
            <div className="space-y-10">
              {page.sections.map((section) => (
                <section key={section.heading} className="space-y-5">
                  <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.heading}-${index}`} className="text-lg text-slate-600 leading-relaxed font-medium">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              {page.faqs && page.faqs.length > 0 ? (
                <section className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 font-display leading-tight">Frequently asked questions</h2>
                  <div className="space-y-6">
                    {page.faqs.map((faq) => (
                      <div key={faq.q} className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-900 font-display leading-tight">{faq.q}</h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </article>

          <aside className="space-y-6 md:space-y-8">
            <div className="rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
              <h3 className="text-2xl font-black text-slate-900 font-display">Useful pages</h3>
              <div className="mt-6 space-y-4">
                {STATIC_PAGES.filter((item) => item.slug !== page.slug).slice(0, 4).map((item) => (
                  <Link key={item.slug} to={`/${item.slug}`} className="block rounded-2xl bg-slate-50 px-5 py-4 transition-colors hover:bg-green-50">
                    <div className="text-sm font-black uppercase tracking-[0.2em] text-green-600 font-display">{item.eyebrow}</div>
                    <div className="mt-2 text-lg font-black text-slate-900 font-display leading-snug">{item.heroTitle}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 bg-white p-6 sm:p-8 shadow-xl shadow-slate-100">
              <h3 className="text-2xl font-black text-slate-900 font-display">Tracking pages</h3>
              <p className="mt-3 text-base text-slate-500 leading-relaxed font-medium">
                Need to check a shipment? Open the courier directory and go straight to the right tracking page.
              </p>
              <a
                href={HOME_SECTION_LINKS.couriers}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-white font-black font-display shadow-lg shadow-green-100"
              >
                Browse couriers
                <ChevronRight size={16} />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 md:pt-32 pb-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 relative z-10">
        <div className="md:col-span-4 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-green-900/20 overflow-hidden">
              <img src="/websitelogo.png" alt="PakTrack logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tighter font-display">PAKTRACK</span>
          </div>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              Track supported courier shipments from one place and check the latest available delivery updates.
            </p>
          <div className="flex gap-4">
            {[
              { Icon: Phone, href: HOME_SECTION_LINKS.contact, label: 'Jump to contact section' },
              { Icon: Mail, href: '/blog', label: 'Open PakTrack blog' },
              { Icon: MapPin, href: HOME_SECTION_LINKS.couriers, label: 'Open courier directory' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all cursor-pointer group">
                <Icon size={20} className="text-slate-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-lg font-black mb-8 font-display">Top Couriers</h4>
          <ul className="space-y-4 text-base font-bold text-slate-400">
              <li><Link to="/tcs-tracking" className="hover:text-green-500 transition-colors">TCS Tracking</Link></li>
              <li><Link to="/leopards-tracking" className="hover:text-green-500 transition-colors">Leopards Tracking</Link></li>
              <li><Link to="/pakistan-post-tracking" className="hover:text-green-500 transition-colors">Pakistan Post</Link></li>
              <li><Link to="/postex-tracking" className="hover:text-green-500 transition-colors">PostEx Tracking</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-lg font-black mb-8 font-display">Quick Links</h4>
          <ul className="space-y-4 text-base font-bold text-slate-400">
              <li><Link to="/about-us" className="hover:text-green-500 transition-colors">About PakTrack</Link></li>
              <li><Link to="/contact-us" className="hover:text-green-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="hover:text-green-500 transition-colors">Courier Blog</Link></li>
              <li><a href={HOME_SECTION_LINKS.faqs} className="hover:text-green-500 transition-colors">FAQs</a></li>
              <li><Link to="/privacy-policy" className="hover:text-green-500 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-800">
            <h4 className="text-xl font-black mb-4 font-display">Stay Updated</h4>
            <p className="text-base text-slate-400 mb-6 font-medium">Get updates on courier rates and new services across Pakistan.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Enter your email" className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-base w-full focus:outline-none focus:border-green-500 font-sans transition-all" />
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl text-base font-black font-display shadow-lg shadow-green-900/20 hover:bg-green-500 transition-all">Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-base font-bold text-slate-500">
        <p>{'\u00A9'} 2026 PakTrack. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <Link to="/about-us" className="hover:text-white transition-colors">About</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link to="/contact-us" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
          </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-600">
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:articleSlug" element={<BlogArticlePage />} />
            <Route path="/about-us" element={<StaticPage />} />
            <Route path="/contact-us" element={<StaticPage />} />
            <Route path="/disclaimer" element={<StaticPage />} />
            <Route path="/privacy-policy" element={<StaticPage />} />
            <Route path="/terms-and-conditions" element={<StaticPage />} />
            <Route path="/cookie-policy" element={<StaticPage />} />
            <Route path="/:courierSlug" element={<TrackingPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
