module CardsHelper
    SYMBOL_IMAGE_NAME = {
        "{r}": "red.png",
        "{g}": "green.png",
        "{u}": "blue.png",
        "{b}": "black.png",
        "{w}": "white.png",
        "{n}": "none.png",
        "{x}": "x.png",
        "{t}": "tap.png",
        "{q}": "untap.png",
        "{1}": "1.png",
        "{2}": "2.png",
        "{3}": "3.png",
        "{4}": "4.png",
        "{5}": "5.png",
        "{6}": "6.png",
        "{7}": "7.png",
        "{8}": "8.png",
        "{9}": "9.png"
    }
    def symbol_to_image_path s
        symbols_path = compute_asset_path('images') + "/symbols_shadowless/"
        return symbols_path + SYMBOL_IMAGE_NAME[s.to_sym]
    end
end