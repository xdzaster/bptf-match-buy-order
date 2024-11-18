// ==UserScript==
// @name         Backpack.tf - Match Buy Order
// @namespace    https://github.com/xdzaster
// @version      0.0.3
// @description  Match any buy order with single click
// @author       dzaster
// @connect      backpack.tf
// @match        https://backpack.tf/classifieds*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=backpack.tf
// @downloadURL  https://github.com/xdzaster/bptf-match-buy-order/raw/main/bptf-match-buy-order.user.js
// @updateURL    https://github.com/xdzaster/bptf-match-buy-order/raw/main/bptf-match-buy-order.meta.js
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";
    GM_addStyle(`
        .form-item {
    display: flex;
    gap: 0.25rem;
    flex-direction: column;
    margin-bottom: 1rem;
    flex: 1 1 0;
    }

    .item-group {
        display: flex;
        gap: 0.25rem;
        flex: wrap;
    }
    `);

    const SPELLS = {
        None: undefined,
        "Footsteps Spell: Team Spirit Footprints": {
            float_value: 1,
            defindex: 1005,
        },
        "Footsteps Spell: Headless Horseshoes": {
            float_value: 2,
            defindex: 1005,
        },
        "Footsteps Spell: Gangreen Footprints": {
            float_value: 8421376,
            defindex: 1005,
        },
        "Footsteps Spell: Corpse Gray Footprints": {
            float_value: 3100495,
            defindex: 1005,
        },
        "Footsteps Spell: Violent Violet Footprints": {
            float_value: 5322826,
            defindex: 1005,
        },
        "Footsteps Spell: Rotten Orange Footprints": {
            float_value: 13595446,
            defindex: 1005,
        },
        "Footsteps Spell: Bruised Purple Footprints": {
            float_value: 8208497,
            defindex: 1005,
        },
        "Paint Spell: Die Job": {
            float_value: 0,
            defindex: 1004,
        },
        "Paint Spell: Chromatic Corruption": {
            float_value: 1,
            defindex: 1004,
        },
        "Paint Spell: Putrescent Pigmentation": {
            float_value: 2,
            defindex: 1004,
        },
        "Paint Spell: Spectral Spectrum": {
            float_value: 3,
            defindex: 1004,
        },
        "Paint Spell: Sinister Staining": {
            float_value: 4,
            defindex: 1004,
        },
        "Standard Spell: Voices From Below": {
            float_value: 1,
            defindex: 1006,
        },
        "Weapon Spell: Pumpkin Bombs": {
            float_value: 1,
            defindex: 1007,
        },
        "Weapon Spell: Halloween Fire": {
            float_value: 1,
            defindex: 1008,
        },
        "Weapon Spell: Exorcism": {
            float_value: 1,
            defindex: 1009,
        },
    };
    const PARTS = {
        None: undefined,
        "Scouts Killed": "10",
        "Snipers Killed": "11",
        "Soldiers Killed": "12",
        "Demomen Killed": "13",
        "Heavies Killed": "14",
        "Pyros Killed": "15",
        "Spies Killed": "16",
        "Engineers Killed": "17",
        "Medics Killed": "18",
        "Buildings Destroyed": "19",
        "Projectiles Reflected": "20",
        "Headshot Kills": "21",
        "Airborne Enemy Kills": "22",
        "Gib Kills": "23",
        "Kills Under A Full Moon": "27",
        Dominations: "28",
        Revenges: "30",
        "Posthumous Kills": "31",
        "Teammates Extinguished": "32",
        "Critical Kills": "33",
        "Kills While Explosive-Jumping": "34",
        "Sappers Removed": "36",
        "Cloaked Spies Killed": "37",
        "Medics Killed That Have Full ÜberCharge": "38",
        "Robots Destroyed": "39",
        "Giant Robots Destroyed": "40",
        "Kills While Low Health": "44",
        "Kills During Halloween": "45",
        "Robots Killed During Halloween": "46",
        "Defender Kills": "47",
        "Submerged Enemy Kills": "48",
        "Kills While Invuln ÜberCharged": "49",
        "Tanks Destroyed": "61",
        "Long-Distance Kills": "62",
        "Kills during Victory Time": "67",
        "Robot Scouts Destroyed": "68",
        "Robot Spies Destroyed": "74",
        "Taunt Kills": "77",
        "Unusual-Wearing Player Kills": "78",
        "Burning Player Kills": "79",
        "Killstreaks Ended": "80",
        "Freezecam Taunt Appearances": "81",
        "Damage Dealt": "82",
        "Fires Survived": "83",
        "Allied Healing Done": "84",
        "Point Blank Kills": "85",
        Kills: "87",
        "Full Health Kills": "88",
        "Taunting Player Kills": "89",
        "Not Crit nor MiniCrit Kills": "93",
        "Player Hits": "94",
        Assists: "95",
    };
    const PAINTS = {
        "Indubitably Green": 7511618,
        "Zepheniah's Greed": 4345659,
        "Noble Hatter's Violet": 5322826,
        "Color No. 216-190-216": 14204632,
        "A Deep Commitment to Purple": 8208497,
        "Mann Co. Orange": 13595446,
        "Muskelmannbraun": 10843461,
        "Peculiarly Drab Tincture": 12955537,
        "Radigan Conagher Brown": 6901050,
        "Ye Olde Rustic Colour": 8154199,
        "Australium Gold": 15185211,
        "Aged Moustache Grey": 8289918,
        "An Extraordinary Abundance of Tinge": 15132390,
        "A Distinctive Lack of Hue": 1315860,
        "Team Spirit": 12073019,
        "Pink as Hell": 16738740,
        "A Color Similar to Slate": 3100495,
        "Drably Olive": 8421376,
        "The Bitter Taste of Defeat and Lime": 3329330,
        "The Color of a Gentlemann's Business Pants": 15787660,
        "Dark Salmon Injustice": 15308410,
        "Operator's Overalls": 4732984,
        "Waterlogged Lab Coat": 11049612,
        "Balaclavas Are Forever": 3874595,
        "An Air of Debonair": 6637376,
        "The Value of Teamwork": 8400928,
        "Cream Spirit": 12807213,
        "A Mann's Mint": 12377523,
        "After Eight": 2960676,
        "Legacy Paint": 5801378
    }
    const KILLSTREAKERS = {
        'Fire Horns': 2002,
        'Cerebral Discharge': 2003,
        'Tornado': 2004,
        'Flames': 2005,
        'Singularity': 2006,
        'Incinerator': 2007,
        'Hypno-Beam': 2008
    }

    const SHEENS = {
        "Team Shine": 1,
        "Deadly Daffodil": 2,
        "Manndarin": 3,
        "Mean Green": 4,
        "Agonizing Emerald": 5,
        "Villainous Violet": 6,
        "Hot Rod": 7,
    }

    const spellOptions = Object.keys(SPELLS);
    const partOptions = Object.keys(PARTS)

    function getDefaultValues(elem) {
        console.log(elem);
        let skininfo = elem.querySelector(".item-icon");
        console.log(skininfo);
        if (skininfo) {
            skininfo = skininfo.style.backgroundImage.match(
                /warpaint\/[(?!_)\S]+_[0-9]+_[0-9]+_[0-9]+\.png/g
            );
        }
        return {
            currencies: parseCurrency(elem.getAttribute("data-listing_price")),
            details: elem.getAttribute("data-listing_comment"),
            spell1: elem.getAttribute("data-spell_1"),
            spell2: elem.getAttribute("data-spell_2"),
            part1: elem.getAttribute("data-part_name_1"),
            part2: elem.getAttribute("data-part_name_2"),
            part3: elem.getAttribute("data-part_name_3"),
            killstreak: elem.getAttribute("data-ks_tier"),
            particle: elem.getAttribute("data-effect_id"),
            elevated: elem.getAttribute("data-quality_elevated"),
            australium: elem.getAttribute("data-australium"),
            festivized: elem.getAttribute("data-festivized"),
            wear: parseInt(skininfo?.[0]?.split("_")[2]),
            paintkit: parseInt(skininfo?.[0]?.split("_")[1]),
            defindex: elem.getAttribute("data-defindex"),
            quality: parseInt(elem.getAttribute("data-quality")),
            tradable: elem.getAttribute("data-tradable") === "1",
            craftable: elem.getAttribute("data-craftable") === "1",
            sheen: elem.getAttribute("data-sheen"),
            paint: elem.getAttribute('data-paint_name'),
            killstreaker: elem.getAttribute('data-killstreaker'),
            sheen: elem.getAttribute('data-sheen'),
            crate: elem.getAttribute('data-crate')
        };
    }

    function getItemData(listingData) {
        const attributes = [];
        const {
            currencies,
            details,
            spell1,
            spell2,
            killstreak,
            particle,
            elevated,
            australium,
            festivized,
            defindex,
            craftable,
            quality,
            tradable,
            paintkit,
            wear,
            part1,
            part2,
            part3,
            paint,
            killstreaker,
            sheen,
            crate
        } = listingData;

        if (SPELLS[spell1]) attributes.push(SPELLS[spell1]);
        if (SPELLS[spell2]) attributes.push(SPELLS[spell2]);
        if (killstreak)
            attributes.push({ defindex: 2025, float_value: parseInt(killstreak) });
        if (particle)
            attributes.push({ defindex: 134, float_value: parseInt(particle) });
        if (elevated) attributes.push({ defindex: 214, float_value: 0 });
        if (australium) attributes.push({ defindex: 2027 });
        if (festivized) attributes.push({ defindex: 2053 });
        if (paintkit) attributes.push({ defindex: 834, value: parseInt(paintkit) });
        if (wear) attributes.push({ defindex: 725, float_value: wear / 10 });
        if (PARTS[part1])
            attributes.push({ defindex: 380, float_value: parseInt(PARTS[part1]) });
        if (PARTS[part2])
            attributes.push({ defindex: 382, float_value: parseInt(PARTS[part2]) });
        if (PARTS[part3])
            attributes.push({ defindex: 384, float_value: parseInt(PARTS[part3]) });
        if (PAINTS[paint]) attributes.push({ defindex: 142, float_value: PAINTS[paint] })
        if (KILLSTREAKERS[killstreaker]) attributes.push({ defindex: 2013, float_value: KILLSTREAKERS[killstreaker] })
        if (SHEENS[sheen]) attributes.push({ defindex: 2014, float_value: SHEENS[sheen] })
        if (crate) attributes.push({ defindex: 187, float_value: parseInt(crate) })
        const data = {
            item: {
                appid: 440,
                defindex,
                quality,
                tradable,
                craftable,
                attributes,
            },
            intent: "buy",
            currencies,
            details,
        };
        return data;
    }

    function parseCurrency(input) {
        const result = { metal: 0, keys: 0 };
        if (input) {
            const parts = input.split(",");
            parts.forEach((part) => {
                const [value, label] = part.trim().split(" ");
                const numericValue = parseFloat(value);
                if (label.startsWith("ref")) {
                    result.metal = numericValue;
                } else if (label.startsWith("key")) {
                    result.keys = numericValue;
                }
            });
        }

        return result;
    }

    function addCustomButtonToListings() {
        // Select all listings on the page
        // const tabs = document.querySelectorAll('.col-md-6')[1]
        const listings = document.querySelectorAll(".listing");

        // Iterate through each listing and add a custom button
        listings.forEach((listing) => {
            const listingButtons = listing.querySelector(".listing-buttons");
            const listingItem = listing.querySelector(".listing-item .item");

            if (listingButtons && listingItem) {
                // Create the custom button
                const button = document.createElement("button");
                button.innerHTML = '<i class="fa fa-sw fa-retweet"></i>';
                button.className = "btn btn-bottom btn-xs btn-info";

                // Add an event listener to the button
                button.addEventListener("click", () => {
                    // Extract necessary data from the listing-item
                    const itemData = getDefaultValues(listingItem);
                    showModal(itemData);
                });

                // Append the custom button to the listing buttons div
                listingButtons.appendChild(button);
            }
        });
    }

    function generateOptionHTML(options, selected) {
        const optionHTML = options
            .map(
                (option) =>
                    `<option value="${option}" ${option === selected ? "selected" : ""
                    }>${option}</option>`
            )
            .join("");
        return optionHTML
    }

    function showModal(modalData) {
        closeModal()
        let modal = document.createElement("div");
        modal.className = "modal-content";
        modal.id = "listingModal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.backgroundColor = "white";
        modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        modal.style.zIndex = 1001;


        function renderPartSelect() {
            if (modalData?.quality === 11 || modalData?.elevated) {
                return `
                <div class='form-item'>
                    <label for="part1">Part 1:</label> 
                    <select name="part1" id="part1">${generateOptionHTML(partOptions, modalData?.part1)}</select> 
                </div>
                <div class='form-item'>
                    <label for="part2">Part 2:</label> 
                    <select name="part2" id="part1">${generateOptionHTML(partOptions, modalData?.part2)}</select>    
                </div> 
                <div class='form-item'>
                    <label for="part3">Part 3:</label> 
                    <select name="part3" id="part3">${generateOptionHTML(partOptions, modalData?.part3)}</select>    
                </div> 
          `
            } else {
                return '';
            }
        }


        modal.innerHTML = `
            <div class="modal-header">
                 <button id="crossButton" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                 <h4 class="modal-title">Create Buy Order</h4>
            </div>
            <form id="cloneData" class='modal-body' style='padding: 1rem'>
                <div class='form-item'>
                    <label for="details">Details:</label> 
                    <textarea id="details" name="details"  maxlength="200"  rows="4" cols="50">${modalData.details}</textarea> 
                </div>
                <div class='item-group'>
                    <div class='form-item'>
                        <label for="buyKeys">Buy Keys:</label> 
                        <input type="number" id="buyKeys" value=${modalData.currencies.keys} name="buyKeys" min="0" step="1"> 
                    </div>
                    <div class='form-item'>
                        <label for="buyMetal">Buy Metal:</label> 
                        <input type="number" id="buyMetal" value=${modalData.currencies.metal} name="buyMetal"  > 
                    </div>
                </div>
                 
                <div class='form-item'>
                    <label for="spell1">Spell 1:</label> 
                    <select name="spell1" id="spell1">${generateOptionHTML(spellOptions, modalData?.spell1)}</select> 
                </div>
                <div class='form-item'>
                    <label for="spell2">Spell 2:</label> 
                    <select name="spell2" id="spell2">${generateOptionHTML(spellOptions, modalData?.spell2)}</select>    
                </div> 
                ${renderPartSelect()}
            </form>
            <div class='modal-footer'> 
                <button id="createListingBtn" type="submit" form="cloneData" class="btn btn-primary">Create Listing</button>
                <button type="button" id="closeModalBtn" class='btn btn-default'>Close</button>
                <p id='footer-message'></p>
            </div>
        `;

        document.body.appendChild(modal);
        document.getElementById("cloneData").onsubmit = (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('createListingBtn')
            const formData = new FormData(e.target);
            submitBtn.innerHTML = 'Creating Listing'
            submitBtn.setAttribute('disabled', true)
            createListing(modalData, formData);
        };

        document.getElementById("crossButton").onclick = closeModal;
        document.getElementById("closeModalBtn").onclick = closeModal;
    }
    function closeModal() {
        let modal = document.getElementById("listingModal");
        if (modal) {
            document.body.removeChild(modal);
        }
    }

    function createListing(listingData, formData) {
        listingData.details = formData.get("details");
        listingData.currencies.keys = formData.get("buyKeys");
        listingData.currencies.metal = formData.get("buyMetal");
        listingData.spell1 = formData.get("spell1");
        listingData.spell2 = formData.get("spell2");
        listingData.part1 = formData.get("part1");
        listingData.part2 = formData.get("part2");
        listingData.part3 = formData.get("part3");

        const payload = getItemData(listingData);
        GM_xmlhttpRequest({
            method: "POST",
            url: `https://api.backpack.tf/api/v2/classifieds/listings`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: JSON.stringify(payload),
            onload: function (response) {
                if (response.status === 201) {
                    closeModal();
                } else {
                    const submitBtn = document.getElementById('createListingBtn')
                    submitBtn.innerHTML = 'Create Listing'
                    submitBtn.removeAttribute('disabled')
                    const footerMessage = document.getElementById('footer-message')
                    if (footerMessage) {
                        footerMessage.textContent = JSON.parse(response?.responseText)?.message;
                        footerMessage.style.color = 'red';
                    }
                    console.error(JSON.parse(response?.responseText).message);
                }
            },
            onerror: function (response) {
                const submitBtn = document.getElementById('createListingBtn')
                submitBtn.innerHTML = 'Create Listing'
                submitBtn.removeAttribute('disabled')
                console.error("Error while creating listing.", response);
            },
        });
    }
    window.addEventListener("load", addCustomButtonToListings);
})();
