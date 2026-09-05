<!-- Portfolio project post (zenvv.dev). Redesign of Bello Aramados'
     institutional website. Comparison images in ./images/. -->

# Institutional Website — Bello Aramados

Full redesign of the institutional website for **Bello Aramados**, a metalworks producing wire, wire mesh, grates and screens, with two plants (Caxias do Sul and Piracicaba). The page structure, URLs and content stayed the same — what changed was the **look, the way information is organized, and the browsing experience**, especially on mobile. Stack: **PHP (CodeIgniter)** on the backend, **vanilla CSS** and targeted JavaScript on the frontend.

## Context

Roughly **90% of the changes are layout and design**. The rest happens behind the scenes: spam protection on the contact form, multi-language support, accessibility and search optimization.

> In the comparisons below, each image shows **Before — Old Site** on the left and **After — Current Site** on the right.

## Header and footer

In the header, the **ISO 9001:2015 seal** now sits front and center next to the logo, the sales contact collapsed into a phone icon + "Sales" (it used to be a long spelled-out phone number), and the mobile menu was rebuilt from scratch: it opens full-screen, with the logo and seal on top, navigation items in a list, and a contact button at the bottom.

In the footer, phone and email became icon cards, the two plants' addresses got a clearer hierarchy, and I fixed a bug where the Facebook icon linked to the company's Instagram instead.

## Home

<figure>
  <img src="/projects/bello-website/images/home--desktop.png" alt="Home page comparison">
  <figcaption>Before (left) and after (right) of the home page.</figcaption>
</figure>

The top section now fills the whole screen, with the factory in the background and a bar indicating the slide's timing. The grid of business sectors (Ventilation, Poultry, Automotive, Food Service, Storage, Solar Energy) was redesigned with icons. And a not-very-informative image carousel was replaced with an actual institutional section: welding processes with real production video, materials worked with, company differentiators, and both plants side by side.

## About

<figure>
  <img src="/projects/bello-website/images/sobre--desktop.png" alt="About page comparison">
  <figcaption>Before (left) and after (right) of the About page.</figcaption>
</figure>

Mission, Vision and Values got an icon and a cleaner layout. The bigger change was the **timeline**: it used to be a horizontal carousel with arrows, and became a vertical track that fills in as the visitor scrolls, with milestones alternating left and right.

## Services

<figure>
  <img src="/projects/bello-website/images/servicos--desktop.png" alt="Services page comparison">
  <figcaption>Before (left) and after (right) of the Services page.</figcaption>
</figure>

Each step of the production process (Design, Raw Material, Cutting, Bending, Assembly, Finishing, Shipping) got its own icon and is now connected by flow arrows, instead of loose circles on a line. The equipment section was reorganized with the machinery video as a background, and the closing contact block got an image and a standardized button style.

## Products

<figure>
  <img src="/projects/bello-website/images/produtos--desktop.png" alt="Products page comparison">
  <figcaption>Before (left) and after (right) of the Products page.</figcaption>
</figure>

The category banner now swaps its background image depending on the selected category, and the product grid actually filters by category now. Photos became zoomable, and the "custom solutions" box was moved next to the listing. Old category URLs still work, redirecting to the new ones.

## Contact

<figure>
  <img src="/projects/bello-website/images/contato--desktop.png" alt="Contact page comparison">
  <figcaption>Before (left) and after (right) of the Contact page.</figcaption>
</figure>

Every form field got an icon and a filled-in example, the contact-reason selector became buttons, and the "Send" button stays disabled with a warning until the form is complete. The plants' map moved from beside the form (where it overlapped the content on smaller screens) to the full width below it.

## Behind the screen

| Area | What changed |
|---|---|
| **Contact form** | Spam protection (a hidden field + a minimum interval between submissions) and a new notification email template |
| **Accessibility** | Visible focus indicator for keyboard navigation, respecting the system's "reduce motion" setting, alt text on images, and a "skip to content" link |
| **Languages** | The page's declared language (pt-br / en / es) now correctly reflects the browsing language |
| **CSS** | Colors, typography and spacing centralized in one place — the same button used to be recreated across 5 different files |

---

_Site in production at Bello Aramados. File and class names were simplified for readability._
