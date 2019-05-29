function HSL(hue, saturation, lightness) {
    
    'use strict';
    
    //Degree on the color wheel from 0 to 360. 0 is red, 120 is green, 240 is blue.
    this.hue = hue;
    //0% means a shade of gray and 100% is the full color.
    this.saturation = saturation;
    //0% is black, 100% is white.
    this.lightness = lightness;
}

function Palette(first_color, last_color, n_colors) {
    
    'use strict';
    
    var i, first_hue, last_hue, first_saturation, last_saturation, first_lightness, last_lightness, aux_hue, aux_saturation, aux_lightness, hues, saturations, lightness, hue_min_distance, hue_direction;
    
    hues = [];
    saturations = [];
    lightness = [];
    this.colors = [];
    
    if (first_color.hue <= last_color.hue) {
        first_hue = first_color;
        last_hue = last_color;
    } else {
        first_hue = last_color;
        last_hue = first_color;
    }
    
    if (first_color.saturation <= last_color.saturation) {
        first_saturation = first_color;
        last_saturation = last_color;
    } else {
        first_saturation = last_color;
        last_saturation = first_color;
    }
    
    if (first_color.lightness <= last_color.lightness) {
        first_lightness = first_color;
        last_lightness = last_color;
    } else {
        first_lightness = last_color;
        last_lightness = first_color;
    }
    
    if (last_hue.hue - first_hue.hue <= 360 - (last_hue.hue - first_hue.hue)) {
        hue_min_distance = last_hue.hue - first_hue.hue;
        hue_direction = 0;
    } else {
        hue_min_distance = 360 - (last_hue.hue - first_hue.hue);
        hue_direction = 1;
    }
    
    if (hue_direction === 0) {
        for (i = 1; i < n_colors + 1; i += 1) {
            aux_hue = Math.round(first_hue.hue + i * hue_min_distance / (n_colors + 1));
            hues[i - 1] = aux_hue;
        }
        
        if (first_hue !== first_color) {
            hues.reverse();
        }
    } else {
        for (i = 1; i < n_colors + 1; i += 1) {
            aux_hue = Math.round((last_hue.hue + i * hue_min_distance / (n_colors + 1)) % 360);
            hues[i - 1] = aux_hue;
        }
        if (first_hue === first_color) {
            hues.reverse();
        }
    }
    
    for (i = 1; i < n_colors + 1; i += 1) {
        aux_saturation = Math.round((first_saturation.saturation + i * (last_saturation.saturation - first_saturation.saturation) / (n_colors + 1)) % 100);
        saturations[i - 1] = aux_saturation;
    }
    
    if (first_saturation !== first_color) {
        saturations.reverse();
    }
    
    for (i = 1; i < n_colors + 1; i += 1) {
        aux_lightness = Math.round((first_lightness.lightness + i * (last_lightness.lightness - first_lightness.lightness) / (n_colors + 1)) % 100);
        lightness[i - 1] = aux_lightness;
    }
    
    if (first_lightness !== first_color) {
        lightness.reverse();
    }
    
    for (i = 0; i < n_colors; i += 1) {
        this.colors[i] = new HSL(hues[i], saturations[i], lightness[i]);
    }
    
}