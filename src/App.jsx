import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "918948100362";
const CART_STORAGE_KEY = "gupta-misthan-cart-v1";

const photos = {
  assorted: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/%28A%29_plate_full_of_Indian_sweets_mithai_desserts.jpg/960px-%28A%29_plate_full_of_Indian_sweets_mithai_desserts.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:(A)_plate_full_of_Indian_sweets_mithai_desserts.jpg",
  },
  assortedB: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/%28A%29_plate_full_of_Indian_sweets_mithai_desserts_b.jpg/960px-%28A%29_plate_full_of_Indian_sweets_mithai_desserts_b.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:(A)_plate_full_of_Indian_sweets_mithai_desserts_b.jpg",
  },
  assortedTray: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/A_tray_full_of_Indian_sweets_mithai_desserts_c.jpg/960px-A_tray_full_of_Indian_sweets_mithai_desserts_c.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:A_tray_full_of_Indian_sweets_mithai_desserts_c.jpg",
  },
  kajuKatli: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Kaju_katli_~_Indian_sweets_made_from_cashewnut_paste_kept_in_a_vessel_on_a_abstract_background.jpg/960px-Kaju_katli_~_Indian_sweets_made_from_cashewnut_paste_kept_in_a_vessel_on_a_abstract_background.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Kaju_katli_~_Indian_sweets_made_from_cashewnut_paste_kept_in_a_vessel_on_a_abstract_background.jpg",
  },
  gulabJamun: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Gulab_Jamun_indian_Sweet.jpg/960px-Gulab_Jamun_indian_Sweet.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Gulab_Jamun_indian_Sweet.jpg",
  },
  rasgulla: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Rasagola_in_Nilagiri_Sweets%2C_Nilagiri%2C_Baleswar_district%2C_Odisha.jpg/960px-Rasagola_in_Nilagiri_Sweets%2C_Nilagiri%2C_Baleswar_district%2C_Odisha.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Rasagola_in_Nilagiri_Sweets,_Nilagiri,_Baleswar_district,_Odisha.jpg",
  },
  laddu: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Laddu_Mithai_Indian_Sweets_January_2013.jpg/960px-Laddu_Mithai_Indian_Sweets_January_2013.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Laddu_Mithai_Indian_Sweets_January_2013.jpg",
  },
  motichoor: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/Mothi_Chur_Laddu%2C_one_of_the_most_popular_Indian_Sweets%2C_photographed_in_West_Bengal%2C_by_Yogabrata_Chakraborty.jpg/960px-Mothi_Chur_Laddu%2C_one_of_the_most_popular_Indian_Sweets%2C_photographed_in_West_Bengal%2C_by_Yogabrata_Chakraborty.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Mothi_Chur_Laddu,_one_of_the_most_popular_Indian_Sweets,_photographed_in_West_Bengal,_by_Yogabrata_Chakraborty.jpg",
  },
  jalebi: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/57/Jalebi_Mithai.JPG/960px-Jalebi_Mithai.JPG",
    credit: "https://commons.wikimedia.org/wiki/File:Jalebi_Mithai.JPG",
  },
  milkSweets: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Burfi_and_Peda%2C_Indian_Sweets_Mithai_Chennai_India.jpg/960px-Burfi_and_Peda%2C_Indian_Sweets_Mithai_Chennai_India.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Burfi_and_Peda,_Indian_Sweets_Mithai_Chennai_India.jpg",
  },
  shop: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6e/Confectioners-stall-jaipur.jpg/960px-Confectioners-stall-jaipur.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Confectioners-stall-jaipur.jpg",
  },
  soanPapdi: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Soan_sohan_papdi_India_Festive_Sweets.jpg/960px-Soan_sohan_papdi_India_Festive_Sweets.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Soan_sohan_papdi_India_Festive_Sweets.jpg",
    label: "soan papdi",
  },
  peda: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/91/Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg/960px-Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Indian_Sweet_Dessert_Peda_in_a_white_bone_china_plate.jpg",
    label: "peda",
  },
  milkCake: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Indian_Milk_Cake.jpg/960px-Indian_Milk_Cake.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Indian_Milk_Cake.jpg",
    label: "milk cake",
  },
  kalakand: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Kalakand_of_Salem.jpg/960px-Kalakand_of_Salem.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Kalakand_of_Salem.jpg",
    label: "kalakand",
  },
  rabri: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Homemade_Rabri.jpg/960px-Homemade_Rabri.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Homemade_Rabri.jpg",
    label: "rabri",
  },
  malaiBarfi: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Lassi_with_malai_and_barfi_2.jpg/960px-Lassi_with_malai_and_barfi_2.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Lassi_with_malai_and_barfi_2.jpg",
    label: "malai and barfi",
  },
  coconutBarfi: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Nariyal_Magaz_burf.png/960px-Nariyal_Magaz_burf.png",
    credit: "https://commons.wikimedia.org/wiki/File:Nariyal_Magaz_burf.png",
    label: "coconut barfi",
  },
  rajbhog: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Rajbhog-from-meerut.jpg/960px-Rajbhog-from-meerut.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Rajbhog-from-meerut.jpg",
    label: "rajbhog",
  },
  rasmalai: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Rasmalai_Indian_Sweet.JPG/960px-Rasmalai_Indian_Sweet.JPG",
    credit: "https://commons.wikimedia.org/wiki/File:Rasmalai_Indian_Sweet.JPG",
    label: "rasmalai",
  },
  desiGheeLaddu: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Laddu_3.jpg/960px-Laddu_3.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Laddu_3.jpg",
    label: "laddu",
  },
  sweetsGiftBox: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Mithaas_sweets_box_Indian_food.jpg/960px-Mithaas_sweets_box_Indian_food.jpg",
    credit: "https://commons.wikimedia.org/wiki/File:Mithaas_sweets_box_Indian_food.jpg",
    label: "Indian sweets gift box",
  },
};

// Edit names, descriptions, prices, and image URLs here to update the shop menu.
const products = [
  { id: "kaju-katli", name: "Kaju Katli", hindi: "काजू कतली", description: "Silky cashew diamond with a delicate silver leaf finish.", prices: { "250g": 320, "500g": 620, "1kg": 1200 }, image: "kajuKatli", tag: "Bestseller", category: "Milk & dry fruit" },
  { id: "gulab-jamun", name: "Gulab Jamun", hindi: "गुलाब जामुन", description: "Soft khoya dumplings, gently soaked in fragrant syrup.", prices: { "250g": 150, "500g": 290, "1kg": 560 }, image: "gulabJamun", tag: "Customer favourite", category: "Classic mithai" },
  { id: "rasgulla", name: "Rasgulla", hindi: "रसगुल्ला", description: "Light, spongy chhena balls in a clear, sweet syrup.", prices: { "250g": 130, "500g": 250, "1kg": 480 }, image: "rasgulla", category: "Classic mithai" },
  { id: "motichoor-laddu", name: "Motichoor Laddu", hindi: "मोतीचूर लड्डू", description: "Tiny golden boondi pearls shaped into a festive classic.", prices: { "250g": 180, "500g": 350, "1kg": 680 }, image: "motichoor", tag: "Festive pick", category: "Laddus" },
  { id: "besan-laddu", name: "Besan Laddu", hindi: "बेसन लड्डू", description: "Roasted gram flour, ghee, and a touch of cardamom.", prices: { "250g": 160, "500g": 310, "1kg": 600 }, image: "laddu", category: "Laddus" },
  { id: "soan-papdi", name: "Soan Papdi", hindi: "सोन पापड़ी", description: "Delicate, flaky layers that melt into a sweet little pause.", prices: { "250g": 140, "500g": 270, "1kg": 520 }, image: "soanPapdi", category: "Classic mithai" },
  { id: "peda", name: "Peda", hindi: "पेड़ा", description: "A rich milk sweet with gentle notes of cardamom.", prices: { "250g": 170, "500g": 330, "1kg": 640 }, image: "peda", category: "Milk & dry fruit" },
  { id: "milk-cake", name: "Milk Cake", hindi: "मिल्क केक", description: "Slow-cooked milk cake with a tender, grainy bite.", prices: { "250g": 180, "500g": 350, "1kg": 680 }, image: "milkCake", category: "Milk & dry fruit" },
  { id: "kalakand", name: "Kalakand", hindi: "कलाकंद", description: "Fresh, creamy milk cake finished with a hint of pistachio.", prices: { "250g": 200, "500g": 390, "1kg": 760 }, image: "kalakand", category: "Milk & dry fruit" },
  { id: "jalebi", name: "Jalebi", hindi: "जलेबी", description: "Crisp, golden spirals with a warm syrupy centre.", prices: { "250g": 120, "500g": 230, "1kg": 440 }, image: "jalebi", tag: "Made fresh", category: "Classic mithai" },
  { id: "rabri", name: "Rabri", hindi: "रबड़ी", description: "Thickened milk layered slowly with a fragrant finish.", prices: { "250g": 190, "500g": 370, "1kg": 720 }, image: "rabri", category: "Milk & dry fruit" },
  { id: "malai-barfi", name: "Malai Barfi", hindi: "मलाई बर्फी", description: "A soft, creamy milk barfi for the sweetest moments.", prices: { "250g": 190, "500g": 370, "1kg": 720 }, image: "malaiBarfi", category: "Milk & dry fruit" },
  { id: "coconut-barfi", name: "Coconut Barfi", hindi: "नारियल बर्फी", description: "Sweet coconut and milk come together in a soft square.", prices: { "250g": 160, "500g": 310, "1kg": 600 }, image: "coconutBarfi", category: "Milk & dry fruit" },
  { id: "rajbhog", name: "Rajbhog", hindi: "राजभोग", description: "A royal-sized chhena delight with a sweet saffron centre.", prices: { "250g": 160, "500g": 310, "1kg": 600 }, image: "rajbhog", category: "Classic mithai" },
  { id: "rasmalai", name: "Rasmalai", hindi: "रसमलाई", description: "Soft chhena patties in chilled, cardamom-scented milk.", prices: { "250g": 210, "500g": 410, "1kg": 800 }, image: "rasmalai", tag: "A little indulgence", category: "Milk & dry fruit" },
  { id: "desi-ghee-laddu", name: "Desi Ghee Laddu", hindi: "देसी घी लड्डू", description: "A traditional, hearty laddu made for sharing the joy.", prices: { "250g": 210, "500g": 410, "1kg": 800 }, image: "desiGheeLaddu", category: "Laddus" },
];

const offers = [
  { title: "Diwali Sweet Boxes", subtitle: "A little light, a lot of mithai.", price: "From ₹599", image: "assorted", badge: "For the festive table" },
  { title: "Wedding Sweet Packages", subtitle: "Sweet beginnings, beautifully shared.", price: "Custom packages", image: "sweetsGiftBox", badge: "Made for your day" },
  { title: "Festival Gift Hampers", subtitle: "Send a box full of warmth.", price: "From ₹799", image: "assortedB", badge: "A thoughtful gift" },
  { title: "Family Celebration Packs", subtitle: "More to share around the table.", price: "From ₹999", image: "assortedTray", badge: "For happy gatherings" },
];

const galleryImages = [
  { image: "assorted", alt: "Assorted Indian sweets for a festive gathering", label: "A little celebration" },
  { image: "kajuKatli", alt: "Kaju katli, a traditional cashew sweet", label: "Made with care" },
  { image: "motichoor", alt: "Traditional Indian motichoor laddu sweets", label: "Golden moments" },
  { image: "jalebi", alt: "Freshly prepared Indian jalebi", label: "Fresh from the kitchen" },
  { image: "rasgulla", alt: "Soft Indian rasgulla sweets", label: "A creamy favourite" },
  { image: "assortedB", alt: "A colourful selection of sweets for family and friends", label: "Thoughtfully packed" },
  { image: "shop", alt: "A traditional confectioner's stall in Jaipur", label: "For every occasion" },
  { image: "gulabJamun", alt: "Gulab jamun, a classic Indian sweet", label: "Sweet little details" },
];

const imageUrl = (image) => photos[image].src;
const photoCreditLabels = {
  assorted: "Indian sweets",
  assortedB: "sweet assortment",
  assortedTray: "sweets tray",
  kajuKatli: "kaju katli",
  gulabJamun: "gulab jamun",
  rasgulla: "rasgulla",
  laddu: "laddu",
  motichoor: "motichoor laddu",
  jalebi: "jalebi",
  milkSweets: "milk sweets",
  shop: "sweet shop",
};

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function readCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) throw new Error("Saved cart is not a list.");
    return stored.filter(
      (item) =>
        item &&
        products.some((product) => product.id === item.productId) &&
        ["250g", "500g", "1kg"].includes(item.weight) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch (error) {
    console.error("Could not read the saved shopping cart:", error);
    return [];
  }
}

function App() {
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [floatingWhatsAppVisible, setFloatingWhatsAppVisible] = useState(true);
  const [notice, setNotice] = useState("");
  const [category, setCategory] = useState("All sweets");
  const floatingWhatsAppRef = useRef(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    preference: "Pickup",
    address: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save the shopping cart:", error);
      setNotice("Your browser could not save the cart. Keep this page open while you shop.");
    }
  }, [cart]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 3800);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const floatingButton = floatingWhatsAppRef.current;
    if (!floatingButton) return undefined;

    let frame = 0;
    const updateVisibility = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const floatingBounds = floatingButton.getBoundingClientRect();
        const overlapsImportantAction = Array.from(
          document.querySelectorAll(
            ".promise-strip, .hero-actions, .product-card .add-button, .story-copy, .offer-card-copy, .gallery-tile figcaption, .visit-copy, .contact-card, .contact-submit, .footer-bottom",
          ),
        ).some((element) => {
          const bounds = element.getBoundingClientRect();
          return (
            bounds.width > 0 &&
            bounds.height > 0 &&
            bounds.right > floatingBounds.left &&
            bounds.left < floatingBounds.right &&
            bounds.bottom > floatingBounds.top &&
            bounds.top < floatingBounds.bottom
          );
        });
        setFloatingWhatsAppVisible(!overlapsImportantAction);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [category]);

  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          if (!product) return null;
          const unitPrice = product.prices[item.weight];
          return { ...item, product, unitPrice, lineTotal: unitPrice * item.quantity };
        })
        .filter(Boolean),
    [cart],
  );
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartDetails.reduce((total, item) => total + item.lineTotal, 0);
  const categories = ["All sweets", "Milk & dry fruit", "Classic mithai", "Laddus"];
  const visibleProducts =
    category === "All sweets" ? products : products.filter((product) => product.category === category);

  const addToCart = (product, weight, quantity) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.productId === product.id && item.weight === weight,
      );
      if (existing) {
        return current.map((item) =>
          item.productId === product.id && item.weight === weight
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId: product.id, weight, quantity }];
    });
    setNotice(`${product.name} added to your bag.`);
  };

  const changeCartQuantity = (productId, weight, difference) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId && item.weight === weight
            ? { ...item, quantity: item.quantity + difference }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId, weight) => {
    setCart((current) =>
      current.filter((item) => !(item.productId === productId && item.weight === weight)),
    );
  };

  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const startOrder = () => {
    setMobileMenuOpen(false);
    if (cartDetails.length) {
      setCartOpen(false);
      setCheckoutOpen(true);
      return;
    }
    openWhatsApp("Namaste Gupta Misthan Bhandar! I'd love to know more about your sweets.");
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const cleanName = orderForm.name.trim();
    const cleanPhone = orderForm.phone.replace(/\D/g, "");
    if (cleanName.length < 2) {
      setFormError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (orderForm.preference === "Delivery" && orderForm.address.trim().length < 8) {
      setFormError("Please enter a complete delivery address (at least 8 characters).");
      return;
    }
    if (!cartDetails.length) {
      setFormError("Your bag is empty. Add a sweet before placing your order.");
      return;
    }
    const lines = cartDetails
      .map(
        (item) =>
          `• ${item.product.name} (${item.weight}) × ${item.quantity} — ${money(item.lineTotal)}`,
      )
      .join("\n");
    const message = [
      "Namaste Gupta Misthan Bhandar! I'd like to place an order:",
      "",
      `Name: ${cleanName}`,
      `Phone: +91 ${cleanPhone}`,
      "",
      "My sweets:",
      lines,
      "",
      `Total: ${money(subtotal)}`,
      `Preference: ${orderForm.preference}`,
      ...(orderForm.preference === "Delivery"
        ? [`Address: ${orderForm.address.trim()}`]
        : []),
    ].join("\n");
    openWhatsApp(message);
    setCheckoutOpen(false);
    setFormError("");
    setNotice("Your order details are ready in WhatsApp. Please send the message to confirm.");
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("contact-name") || "").trim();
    const phone = String(formData.get("contact-phone") || "").replace(/\D/g, "");
    const message = String(formData.get("contact-message") || "").trim();
    if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || message.length < 10) {
      setNotice("Please enter your name, a valid 10-digit phone number, and a message of at least 10 characters.");
      return;
    }
    openWhatsApp(
      `Namaste Gupta Misthan Bhandar! I'm ${name} (+91 ${phone}).\n\n${message}`,
    );
    event.currentTarget.reset();
    setNotice("Your message is ready in WhatsApp. Please send it to contact the shop.");
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f5ebdd] text-[#30201e]">
      <div className="announcement">
        <Sparkles size={14} aria-hidden="true" />
        <span>Made fresh with love, for all your little celebrations</span>
        <span className="announcement-hindi">हर खुशी के लिए, मिठास के साथ</span>
      </div>

      <header className="site-header">
        <nav className="nav-shell" aria-label="Main navigation">
          <a className="brand" href="#home" onClick={() => setMobileMenuOpen(false)}>
            <span className="brand-mark" aria-hidden="true"><span>गु</span></span>
            <span className="brand-copy">
              <strong>Gupta Misthan</strong>
              <small>BHANDAR · मिठास की पहचान</small>
            </span>
          </a>
          <div className={`nav-links ${mobileMenuOpen ? "nav-links-open" : ""}`}>
            {[
              ["Home", "home"],
              ["Our story", "about"],
              ["Our sweets", "sweets"],
              ["Offers", "offers"],
              ["Gallery", "gallery"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>{label}</a>
            ))}
            <button className="mobile-order-button" onClick={startOrder}><WhatsAppIcon /> Order on WhatsApp <ArrowRight size={16} /></button>
          </div>
          <div className="nav-actions">
            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping bag, ${cartCount} items`}
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              <span className="cart-button-label">Bag</span>
              <span className="cart-count">{cartCount}</span>
            </button>
            <button className="nav-order-button" onClick={startOrder}>
              <WhatsAppIcon /><span>Order on WhatsApp</span><ArrowRight size={16} />
            </button>
            <button
              className="menu-toggle"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-backdrop" />
          <div className="hero-pattern" />
          <div className="hero-content">
            <div className="eyebrow hero-eyebrow"><span /> A little sweetness goes a long way</div>
            <h1>Welcome to<br /><em>Gupta Misthan</em><br />Bhandar</h1>
            <p className="hero-hindi">स्वाद जो दिलों में बस जाए!</p>
            <p className="hero-description">
              Experience the authentic taste of traditional Indian sweets, made with love, freshness, and quality.
            </p>
            <div className="hero-actions">
              <button className="button button-gold" onClick={() => scrollTo("sweets")}>
                Explore our sweets <ArrowDown size={17} />
              </button>
              <button className="button button-outline-light" onClick={startOrder}>
                <WhatsAppIcon /> Order on WhatsApp
              </button>
            </div>
            <div className="hero-proof">
              <span className="proof-icon"><Leaf size={17} /></span>
              <span>Thoughtful ingredients</span><span className="proof-divider" />
              <span>Sweetness worth sharing</span>
            </div>
          </div>
          <div className="hero-stamp"><span>मिठास</span><small>MADE WITH<br />LOVE</small></div>
          <a href="#sweets" className="hero-scroll" aria-label="Scroll to our sweets"><span /> Scroll to discover</a>
        </section>

        <section className="promise-strip" aria-label="What makes our sweets special">
          <div className="promise-item"><span className="promise-icon"><Sparkles size={19} /></span><span><strong>Freshly prepared</strong><small>For life's sweet moments</small></span></div>
          <div className="promise-item"><span className="promise-icon"><Heart size={19} /></span><span><strong>Made with care</strong><small>A little love in every bite</small></span></div>
          <div className="promise-item"><span className="promise-icon"><PackageCheck size={19} /></span><span><strong>Ready to share</strong><small>From our family to yours</small></span></div>
          <div className="promise-note">खुशियाँ बाँटने का सबसे प्यारा तरीका</div>
        </section>

        <section className="section sweets-section" id="sweets">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span /> A box full of happiness</div>
              <h2>Our <em>sweet</em> selection</h2>
              <p>Little handmade joys for the everyday and the extraordinary.</p>
            </div>
            <div className="section-side-note"><span>16</span> lovely ways<br />to make someone smile</div>
          </div>
          <div className="filter-row" aria-label="Filter sweets by category">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter-chip ${category === item ? "filter-chip-active" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
            <span className="weight-note"><ChevronDown size={15} /> Pick your perfect size</span>
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>
          <p className="pricing-note">Prices shown are editable sample prices. Please confirm availability and final pricing with us on WhatsApp.</p>
        </section>

        <section className="story-section" id="about">
          <div className="story-image-wrap">
            <img
              src={imageUrl("assorted")}
              alt="A colourful selection of traditional Indian sweets made for sharing"
              loading="lazy"
            />
            <div className="story-image-card"><span>मीठी यादें</span><small>THE TASTE OF TOGETHERNESS</small></div>
            <span className="story-image-dot" />
          </div>
          <div className="story-copy">
            <div className="eyebrow"><span /> A tradition of togetherness</div>
            <h2>Our story is<br />made of <em>sweet moments.</em></h2>
            <p>
              At Gupta Misthan Bhandar, we believe the best memories are made when something lovely is passed around the table. Our traditional Indian sweets bring familiar flavours, thoughtful preparation, and a little joy to everyday moments and special celebrations alike.
            </p>
            <p>
              Freshness, quality, and your happiness guide every sweet we make. From a favourite bite after dinner to a box shared with loved ones, we put care into making each moment feel a little sweeter.
            </p>
            <div className="story-signoff"><span className="signoff-rule" /><span>With warmth, <strong>Vikas Gupta</strong><small>OWNER, GUPTA MISTHAN BHANDAR</small></span></div>
            <button className="text-link" onClick={() => scrollTo("contact")}>Come say hello <ArrowRight size={17} /></button>
          </div>
        </section>

        <section className="offer-section" id="offers">
          <div className="section offer-inner">
            <div className="section-heading offer-heading">
              <div>
                <div className="eyebrow eyebrow-light"><span /> Made for the moments that matter</div>
                <h2>A little box of <em>joy</em></h2>
                <p>Thoughtful sweet selections, ready to make a lovely occasion even sweeter.</p>
              </div>
              <button className="button button-outline-light offer-contact" onClick={startOrder}>Ask us about a box <ArrowRight size={16} /></button>
            </div>
            <div className="offer-grid">
              {offers.map((offer, index) => (
                <article className="offer-card" key={offer.title}>
                  <div className="offer-image">
                    <img src={imageUrl(offer.image)} alt={`${offer.title} sweet assortment`} loading="lazy" />
                    <span className="offer-badge">{offer.badge}</span>
                    <span className="offer-number">0{index + 1}</span>
                  </div>
                  <div className="offer-card-copy">
                    <div><h3>{offer.title}</h3><p>{offer.subtitle}</p></div>
                    <span className="offer-price">{offer.price}</span>
                    <button className="offer-arrow" onClick={startOrder} aria-label={`Ask about ${offer.title}`}><ArrowRight size={18} /></button>
                  </div>
                </article>
              ))}
            </div>
            <p className="offer-sample-note">Sample offers shown. Please ask us about availability and custom selections.</p>
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="section-heading gallery-heading">
            <div>
              <div className="eyebrow"><span /> Little things worth savouring</div>
              <h2>A feast for the <em>eyes.</em></h2>
              <p>Take a peek at the sweetness we love to share.</p>
            </div>
            <span className="gallery-caption"><Star size={15} fill="currentColor" /> A little joy in every box</span>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((item, index) => (
              <figure className={`gallery-tile gallery-tile-${index + 1}`} key={item.label}>
                <img src={imageUrl(item.image)} alt={item.alt} loading="lazy" decoding="async" />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="visit-section" id="contact">
          <div className="visit-pattern" />
          <div className="visit-copy">
            <div className="eyebrow eyebrow-light"><span /> Your neighbourhood sweet stop</div>
            <h2>Come for a sweet.<br /><em>Stay for the feeling.</em></h2>
            <p>We'd love to help make your next gathering a little more delicious.</p>
            <div className="visit-address"><MapPin size={19} /><span><strong>Gupta Misthan Bhandar</strong><br />Bariyavan, Akbarpur, Ambedkar Nagar,<br />Uttar Pradesh, India.</span></div>
            <div className="visit-contact-row"><Phone size={17} /><a href="tel:+918948100362">+91 89481 00362</a><span>Owner · Vikas Gupta</span></div>
            <div className="visit-buttons">
              <a className="button button-gold" href="https://www.google.com/maps/search/?api=1&query=Bariyavan%2C+Akbarpur%2C+Ambedkar+Nagar%2C+Uttar+Pradesh%2C+India" target="_blank" rel="noreferrer"><MapPin size={16} /> Find us on the map</a>
              <button className="button button-outline-light" onClick={startOrder}><WhatsAppIcon /> Chat with us</button>
            </div>
            <div className="visit-hours"><Clock3 size={15} /> For current opening hours, please call or message us.</div>
          </div>
          <div className="contact-card">
            <div className="contact-card-kicker">WE'RE ALL EARS</div>
            <h3>Let's make it<br /><em>a sweet one.</em></h3>
            <p>Tell us what you're celebrating or what you'd love to know.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <label>Your name<input name="contact-name" autoComplete="name" placeholder="How should we call you?" required minLength={2} /></label>
              <label>Phone number<input name="contact-phone" autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" required pattern="[6-9][0-9]{9}" /></label>
              <label>Your message<textarea name="contact-message" placeholder="A sweet question, a celebration, anything..." required minLength={10} rows={3} /></label>
              <button className="button button-maroon contact-submit" type="submit">Send us a message <ArrowRight size={17} /></button>
              <small>We'll open WhatsApp so you can send your message directly.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true"><span>गु</span></span>
          <span className="brand-copy"><strong>Gupta Misthan</strong><small>BHANDAR · मिठास की पहचान</small></span>
        </a>
        <p>Making life's little celebrations a little sweeter.</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Gupta Misthan Bhandar · Vikas Gupta</span>
          <span>Made with care in Akbarpur, Uttar Pradesh <Heart size={13} fill="currentColor" /></span>
        </div>
        <div className="photo-credits">
          Food and shop photos via Wikimedia Commons:
          {Object.entries(photos).map(([key, photo]) => (
            <a key={photo.credit} href={photo.credit} target="_blank" rel="noreferrer">
            {photo.label || photoCreditLabels[key]}
            </a>
          ))}
        </div>
      </footer>

      <button
        ref={floatingWhatsAppRef}
        className={`floating-whatsapp ${floatingWhatsAppVisible ? "" : "floating-whatsapp-obscured"}`}
        onClick={startOrder}
        aria-label="Order on WhatsApp"
        aria-hidden={!floatingWhatsAppVisible}
        tabIndex={floatingWhatsAppVisible ? 0 : -1}
      >
        <WhatsAppIcon /><span>Order on WhatsApp</span>
      </button>

      {notice && <div className="toast" role="status"><Check size={17} />{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={15} /></button></div>}

      {cartOpen && (
        <div className="overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-heading"><div><span className="drawer-eyebrow">A little sweetness awaits</span><h2 id="cart-title">Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag"><X size={22} /></button></div>
            {cartDetails.length === 0 ? (
              <div className="empty-cart"><span className="empty-bag"><ShoppingBag size={26} /></span><h3>Your bag is taking a little break.</h3><p>Add a sweet treat and it will be waiting here.</p><button className="button button-maroon" onClick={() => { setCartOpen(false); scrollTo("sweets"); }}>Explore the sweets <ArrowRight size={16} /></button></div>
            ) : (
              <>
                <div className="cart-lines">
                  {cartDetails.map((item) => (
                    <article className="cart-line" key={`${item.product.id}-${item.weight}`}>
                      <img src={imageUrl(item.product.image)} alt={item.product.name} />
                      <div className="cart-line-info"><h3>{item.product.name}</h3><span>{item.weight} · {money(item.unitPrice)} each</span><div className="quantity-control cart-quantity"><button onClick={() => changeCartQuantity(item.product.id, item.weight, -1)} aria-label={`Decrease ${item.product.name} quantity`}><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeCartQuantity(item.product.id, item.weight, 1)} aria-label={`Increase ${item.product.name} quantity`}><Plus size={13} /></button></div></div>
                      <div className="cart-line-total"><strong>{money(item.lineTotal)}</strong><button onClick={() => removeFromCart(item.product.id, item.weight)} aria-label={`Remove ${item.product.name}`}><Trash2 size={15} /></button></div>
                    </article>
                  ))}
                </div>
                <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Delivery or pickup details can be shared on WhatsApp.</p><button className="button button-maroon checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Continue to WhatsApp <ArrowRight size={17} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Continue browsing</button></div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div className="overlay checkout-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
          <section className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="drawer-heading"><div><span className="drawer-eyebrow">Almost there — sweet choice!</span><h2 id="checkout-title">Your order details</h2></div><button className="icon-button" onClick={() => setCheckoutOpen(false)} aria-label="Close order form"><X size={22} /></button></div>
            <div className="checkout-summary">
              {cartDetails.map((item) => <div key={`${item.product.id}-${item.weight}`}><span>{item.product.name} · {item.weight} × {item.quantity}</span><strong>{money(item.lineTotal)}</strong></div>)}
              <div className="checkout-total"><span>Total</span><strong>{money(subtotal)}</strong></div>
            </div>
            <form className="checkout-form" onSubmit={submitOrder} noValidate>
              <label>Your name<input value={orderForm.name} onChange={(event) => setOrderForm({ ...orderForm, name: event.target.value })} autoComplete="name" placeholder="Your full name" /></label>
              <label>Phone number<input value={orderForm.phone} onChange={(event) => setOrderForm({ ...orderForm, phone: event.target.value })} autoComplete="tel" inputMode="tel" placeholder="10-digit mobile number" maxLength={14} /></label>
              <fieldset><legend>Would you prefer delivery or pickup?</legend><div className="preference-options">{["Pickup", "Delivery"].map((item) => <button type="button" className={orderForm.preference === item ? "preference-active" : ""} key={item} onClick={() => setOrderForm({ ...orderForm, preference: item })}>{item}</button>)}</div></fieldset>
              {orderForm.preference === "Delivery" && <label>Delivery address<textarea value={orderForm.address} onChange={(event) => setOrderForm({ ...orderForm, address: event.target.value })} placeholder="House / area, locality, city, PIN code" rows={3} /></label>}
              {formError && <p className="form-error" role="alert">{formError}</p>}
              <button className="button button-maroon checkout-button" type="submit"><WhatsAppIcon /> Continue in WhatsApp <ArrowRight size={16} /></button>
              <p className="checkout-disclaimer">Your order opens in WhatsApp. The shop will confirm availability and the final total with you directly.</p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [weight, setWeight] = useState("250g");
  const [quantity, setQuantity] = useState(1);
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={imageUrl(product.image)} alt={`${product.name} Indian sweet`} loading="lazy" decoding="async" />
        {product.tag && <span className="product-tag"><Sparkles size={12} />{product.tag}</span>}
        <span className="product-hindi">{product.hindi}</span>
      </div>
      <div className="product-info">
        <div className="product-title-row"><h3>{product.name}</h3><strong>{money(product.prices[weight])}</strong></div>
        <p>{product.description}</p>
        <div className="product-controls">
          <label className="weight-select-label"><span>WEIGHT</span><select value={weight} onChange={(event) => setWeight(event.target.value)} aria-label={`Select weight for ${product.name}`}>{Object.keys(product.prices).map((size) => <option value={size} key={size}>{size}</option>)}</select><ChevronDown size={13} /></label>
          <div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label={`Decrease ${product.name} quantity`}><Minus size={13} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => Math.min(20, value + 1))} aria-label={`Increase ${product.name} quantity`}><Plus size={13} /></button></div>
        </div>
        <button className="add-button" onClick={() => onAdd(product, weight, quantity)}><span>Add to bag</span><ShoppingBag size={16} /></button>
      </div>
    </article>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="whatsapp-icon">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.97 11.97 0 0 0 5.85 1.49h.01c6.6 0 11.97-5.37 11.97-11.97a11.9 11.9 0 0 0-3.51-8.41Zm-8.46 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.23-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 7 2.9 9.84 9.84 0 0 1 2.89 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.06 2.89 1.21 3.09c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default App;
