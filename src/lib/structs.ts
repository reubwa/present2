export const SlideTypes = {
    TextBullets : "Text and Bullet Points",
    TitleSubtitle : "Title and Subtitle",
    Markdown : "Markdown",
    Image : "Image",
    Maths : "Maths",
    Code : "Code"
} as const;

export type SlideTypes = typeof SlideTypes[keyof typeof SlideTypes];