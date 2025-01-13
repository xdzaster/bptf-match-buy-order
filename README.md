# Backpack.tf - Match Buy Order

[![Version](https://img.shields.io/badge/Version-0.0.3-brightgreen.svg)](https://github.com/xdzaster/bptf-match-buy-order)
[![Author](https://img.shields.io/badge/Author-dzaster-blue.svg)](https://github.com/xdzaster)

### Overview

This userscript adds a convenient button on backpack.tf classified listings that allows users to match a buy order with a single click. It extracts item data, such as spells, parts, and other attributes, and creates a customized buy order.

### Features
![image](https://github.com/xdzaster/bptf-match-buy-order/blob/main/images/button.PNG?raw=true)
![image](https://github.com/xdzaster/bptf-match-buy-order/blob/main/images/modal.PNG?raw=true)

- Adds a custom button to each listing to create buy orders.
- Supports spells, parts, killstreaks, particles, and other attributes for refined item selection.
- Modal interface to preview and modify buy order details before submitting.

### Installation

1. Install a userscript manager, such as [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. [Click here to install the userscript](https://github.com/xdzaster/bptf-match-buy-order/raw/main/bptf-match-buy-order.user.js).
3. Confirm the installation in your userscript manager.

### Usage

1. Go to the [backpack.tf classified listings](https://backpack.tf/classifieds).
2. Each listing now includes a new button.
3. Click the button to open a modal window, where you can:
   - View and adjust item details.
   - Specify desired spells, parts, currencies, and other attributes.
4. Click "Create Listing" to submit your buy order.

> [!IMPORTANT]
> The newly created listing will only appear after refreshing the page.
>
> Please **double-check** the listing after it's created. The script may have **unforeseen issues** that could result in incorrect listings.
>


### Dependencies

- [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).

### Settings

The following item attributes can be configured in the modal:

- **Spells** - Select from available spell types.
- **Parts** - Choose up to three item parts.
- **Buy Keys** and **Buy Metal** - Define buy order price.
- **Additional Details** - Provide a custom message or notes for the buy order.
- **Future Customizations** - More customization options will be added in future updates.

### License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

### Contributing

Feel free to submit a pull request or open an issue for feature requests or bug fixes.

---

Happy trading!

---
