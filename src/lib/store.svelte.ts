import { Presentation, Slide, SlideTypes } from './structs.svelte.ts';

// Create a single shared instance using $state at top level
// eslint-disable-next-line prefer-const
let _sharedPresentation = $state(new Presentation("New Presentation"));

// Initialize with default slide
if (_sharedPresentation.slides.length === 0) {
    _sharedPresentation.slides.push(new Slide(SlideTypes.TitleSubtitle));
}

// Export the shared presentation - always returns the same instance
export const currentPresentation = _sharedPresentation;



