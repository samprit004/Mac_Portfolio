Recreate my current React `ContactWindow` component to match the uploaded macOS Contacts app screenshot as closely and accurately as possible. The final result should feel like a near 1:1 recreation of the Apple Contacts desktop UI shown in the reference image.

IMPORTANT:

* Match the layout structure EXACTLY.
* Match spacing, alignment, typography hierarchy, sidebar proportions, row heights, icon positions, profile positioning, section spacing, and overall visual density exactly like the screenshot.
* The UI should feel like the native macOS Contacts application, not a generic inspired version.
* Ignore the black arrows and sparkle icons drawn on the screenshot. Those are annotation marks and should NOT be included.

Keep compatibility with my existing:

* `WindowWrapper`
* `WindowControls`
* React architecture
* draggable window system

DO NOT redesign the app.
DO NOT modernize it.
DO NOT improvise layout structure.
DO NOT add glassmorphism or futuristic portfolio styling.
The goal is replication accuracy.

Main structural requirements:

WINDOW:

* Same aspect ratio and sizing feel as the screenshot
* macOS floating desktop window appearance
* subtle rounded corners
* thin native-style border
* native macOS shadow softness
* exact title bar proportions
* exact panel division widths

TITLE BAR:

* Exact macOS Contacts title bar look
* same light grey gradient tone
* same title alignment
* same traffic-light spacing
* same vertical centering
* exact title font size and weight

SIDEBAR:

* Width must visually match screenshot exactly
* Use same macOS light sidebar background
* Same search bar placement and dimensions
* Same search field style
* Same list spacing
* Same alphabetical grouping behavior
* Same contact item padding
* Same selected row styling
* Same blue active highlight
* Same typography sizes and weights
* Same left alignment
* Same row height
* Same divider appearance

Populate sidebar with multiple realistic contact names exactly like macOS Contacts:

* Jenica Chong
* Jenny Court
* Darla Davidson
* Alejandra Delgado
* Rich Dinh
* Liz Dizon
* Jasmine Garcia
* Lupita Garcia-Reilley

Use “Jasmine Garcia” as the selected active contact exactly like the screenshot.

RIGHT DETAIL PANEL:
Must match the screenshot layout extremely closely.

HEADER AREA:

* Circular profile image at top center
* Same spacing from top
* Same image sizing
* Name directly below profile image
* Exact typography hierarchy
* Exact text spacing
* Same alignment behavior

ACTION BUTTONS:
Recreate the exact macOS Contacts circular action buttons:

* message
* call
* video
* mail

Use:

* circular soft grey/blue buttons
* exact spacing
* same icon sizing
* same label positioning
* same vertical alignment
* same hover behavior feel

DETAIL ROWS:
Replicate Apple Contacts detail rows exactly:

* left aligned labels
* ultra-light dividers
* same row height
* same typography sizing
* same text alignment
* same spacing between label and values
* same muted grey labels
* same darker value text

Rows should visually match screenshot:

* work
* FaceTime
* home
* birthday
* home address
* note

Home address should wrap exactly like screenshot.

BOTTOM AREA:

* Add the small "+" button bottom left
* Add “Edit” button bottom right
* Match native macOS placement and styling
* Same padding and border behavior

TYPOGRAPHY:
Use native Apple-style typography:

* SF Pro Text
* SF Pro Display
* correct font weights
* correct macOS font smoothing feel
* proper tracking and letter spacing

COLORS:
Use authentic macOS Contacts colors:

* sidebar greys
* divider greys
* active blue
* muted label greys
* white panel background
* subtle hover states

SPACING:
This is critical.
Every section should match the screenshot proportions:

* tighter paddings
* exact contact row heights
* exact search bar margin
* exact profile spacing
* exact action icon spacing
* exact detail row spacing

INTERACTIONS:

* smooth subtle hover transitions
* native-feeling button hover states
* proper cursor states
* clickable social/contact actions
* preserve accessibility

RESPONSIVENESS:
Even though it mimics desktop Contacts, ensure:

* no layout breaking
* proper overflow handling
* responsive scaling support

CODE QUALITY:

* modularize repeated UI
* avoid inline clutter where possible
* keep architecture clean
* reusable row components
* reusable sidebar contact item components

VISUAL GOAL:
The final result should make users think this is literally the macOS Contacts application embedded inside the portfolio window system.

Focus heavily on:

* precision
* alignment
* proportions
* typography
* native Apple visual language
* realism
* subtlety

Do not make it feel like a portfolio section.
Make it feel like an actual macOS app window.
