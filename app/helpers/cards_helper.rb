module CardsHelper
    SYMBOL_IMAGE_NAME = {
        "{r}": { relative_path: "red.png", alt: "red mana" },
        "{g}": { relative_path: "green.png", alt: "green mana" },
        "{u}": { relative_path: "blue.png", alt: "blue mana" },
        "{b}": { relative_path: "black.png", alt: "black mana" },
        "{w}": { relative_path: "white.png", alt: "white mana" },
        "{x}": { relative_path: "x.png", alt: "x mana" },
        "{t}": { relative_path: "tap.png", alt: "tap" },
        "{q}": { relative_path: "untap.png", alt: "nntap" },
        "{1}": { relative_path: "1.png", alt: "1 mana" },
        "{2}": { relative_path: "2.png", alt: "2 mana" },
        "{3}": { relative_path: "3.png", alt: "3 mana" },
        "{4}": { relative_path: "4.png", alt: "4 mana" },
        "{5}": { relative_path: "5.png", alt: "5 mana" },
        "{6}": { relative_path: "6.png", alt: "6 mana" },
        "{7}": { relative_path: "7.png", alt: "7 mana" },
        "{8}": { relative_path: "8.png", alt: "8 mana" },
        "{9}": { relative_path: "9.png", alt: "9 mana" }
    }
    def symbol_to_image_path s
        symbols_path = compute_asset_path('images') + "/symbols_shadowless/"
        return symbols_path + SYMBOL_IMAGE_NAME[s.to_sym][:relative_path]
    end

    def symbol_info k
        symbols_path = compute_asset_path('images') + "/symbols_shadowless/"
        info = SYMBOL_IMAGE_NAME[k.to_sym]
        abs_path = symbols_path + info[:relative_path]
        alt = info[:alt]
        return { path: abs_path, alt: alt}
    end
end