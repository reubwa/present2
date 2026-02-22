export const SlideTypes = {
    TextBullets : "Text and Bullet Points",
    TitleSubtitle : "Title and Subtitle",
    Markdown : "Markdown",
    Image : "Image",
    Maths : "Maths",
    Code : "Code"
};

export const BuiltInThemes = {
    Beige : "Beige",
    Blood : "Blood",
    Black : "Black",
    League : "League",
    Moon : "Moon",
    Night : "Night",
    Serif : "Serif",
    Simple : "Simple",
    Sky : "Sky",
    Solarized : "Solarized",
    White : "White",
    Dracula : "Dracula"
};

export const Transitions = {
    None : "None",
    Fade : "Fade",
    Slide : "Slide",
    Convex : "Convex",
    Concave : "Concave",
    Zoom : "Zoom"
};

export const TransitionSpeeds = {
    Default : "Default",
    Fast : "Fast",
    Slow : "Slow"
}

export type SlideTypes = typeof SlideTypes[keyof typeof SlideTypes];
export type BuiltInThemes = typeof BuiltInThemes[keyof typeof BuiltInThemes];
export type Transitions = typeof Transitions[keyof typeof Transitions];
export type TransitionSpeeds = typeof TransitionSpeeds[keyof typeof TransitionSpeeds];