export default {
  instrument() {
    return this.$store.getters.instrument;
  },
  ariaDescId() {
    return "dt-fretboard-desc-" + this.ariaId;
  },
  ariaDescText() {
    return "Scale: " + this.scale + "; Tuning: " + this.tuning;
  },
  ariaIds() {
    return this.ariaTitleId + " " + this.ariaDescId;
  },
  ariaTitleId() {
    return "dt-fretboard-title-" + this.ariaId;
  },
  ariaTitleText() {
    return this.title;
  },
  fretsNormalized() {
    return Math.max(1, Math.min(30, this.frets));
  },

  fretRenderings() {
    let renderings = [];
    let oy = this.start == 0 ? this.noteRadius * 2 : 0;
    for (
      let fret = 0, length = this.fretsNormalized + 1;
      fret <= length;
      fret++
    ) {
      let rendering = {
        height: fret == 0 && this.hasNut ? this.nutSize * 1 : this.fretSize * 1,
        width:
          (this.isHorizontal ? this.height : this.width) - this.noteRadius * 2,
        y: oy,
        x: this.noteRadius * 1,
        color: this.fretColor,
      };
      if (this.isHorizontal) {
        rendering = {
          height: rendering.width,
          width: rendering.height,
          y: rendering.x,
          x: rendering.y,
          color: rendering.color,
        };
        if (this.instrument.leftDominantHand) {
          rendering.x = this.width - rendering.x - rendering.width;
        }
      }
      renderings.push(rendering);
      oy += fret == 0 && this.hasNut ? this.nutSize * 1 : this.fretSize * 1;
      oy += this.fretSpace * 1;
    }
    return renderings;
  },

  referenceRendering() {
    if (!(this.reference + "").length) {
      return [];
    }
    let neck = {};
    let referenceDots = this.reference.trim().split(/\s+/);
    referenceDots.forEach(function (referenceDot) {
      if (!Object.prototype.hasOwnProperty.call(neck, referenceDot)) {
        neck[referenceDot] = 0;
      }
      ++neck[referenceDot];
    });

    let ox = 0;
    //let oy = 0;
    let renderings = [];
    Object.entries(neck).forEach((referenceDot) => {
      if (
        referenceDot[0] < this.startNormalized ||
        referenceDot[0] > this.frets - this.startNormalized
      )
        return;
      for (let dot = 0; dot < referenceDot[1]; ++dot) {
        let rendering = {};
        rendering.radius = this.referenceRadius * 1;
        rendering.fill = this.referenceColor;
        let mid = Math.floor(this.instrument.strings / 2);
        rendering.cx =
          1 +
          (mid > 0
            ? this.stringSizeNormalized.slice(0, mid).reduce((r, n) => r + n)
            : 0) +
          this.stringSpace * (mid - 0.5) +
          this.noteRadius / 2 +
          this.referenceRadius / 2 +
          ox;
        if (referenceDot[1] > 1) {
          rendering.cx +=
            (this.stringSizeNormalized[mid + (dot === 0 ? -1 : 0)] +
              this.stringSpace * 1) *
            (dot === 0 ? -1 : 1);
        }
        let cy = 0;
        if (this.startNormalized === 0) cy += this.noteRadius * 2;
        let offset = referenceDot[0] - (this.startNormalized || 1);
        cy += this.hasNut ? this.nutSize * 1 : this.fretSize * 1;
        cy += this.fretSize * offset;
        cy += this.fretSpace * offset;
        cy += this.fretSpace / 2;
        rendering.cy = cy;
        renderings.push(rendering);
        if (this.isHorizontal) {
          let temp = rendering.cx;
          rendering.cx = rendering.cy;
          rendering.cy = temp;
          if (this.instrument.leftDominantHand) {
            rendering.cx = this.width - rendering.cx;
          }
        }
      }
    });
    return renderings;
  },

  scaleInfo() {
    if (!this.scaleNormalized.length || !this.tuningNormalized.length) {
      return [];
    }

    let renderings = [];
    let start = this.startNormalized;
    let frets = this.fretsNormalized;
    let ox = 0;
    for (let string = 0; string < this.instrument.strings; ++string) {
      let oy = start > 0 ? (start === 1 ? this.nutSize : this.fretSize) * 1 : 0;
      for (let fret = start; fret <= frets; ++fret) {
        let rendering = {};
        rendering.x =
          ox + this.stringSizeNormalized[string] / 2 + this.noteRadius * 1;
        let value = (fret + this.tuningNormalized[string]) % 12;
        let index = this.scaleNormalized.indexOf(value);
        if (~index) {
          let ny = fret === 0 ? this.noteRadius * 1 : this.fretSpace / 2;
          rendering.y = oy + ny;
          rendering.fret = fret;
          rendering.note = this.noteNames[value];
          rendering.color = index === 0 ? this.rootColor : this.noteColor;
          rendering.textColor =
            index === 0 ? this.rootTextColor : this.noteTextColor;
          if (this.isHorizontal) {
            let temp = rendering.x;
            rendering.x = rendering.y;
            rendering.y = temp;
            if (this.instrument.leftDominantHand) {
              rendering.x = this.width - rendering.x;
            }
          }
          renderings.push(rendering);
        }
        if (fret === 0) {
          oy += this.noteRadius * 2 + this.nutSize * 1;
        } else {
          oy += this.fretSpace * 1 + this.fretSize * 1;
        }
      }
      ox += this.stringSpace * 1 + this.stringSizeNormalized[string];
    }
    return renderings;
  },

  scaleNormalized() {
    let noteValue = {
      C: 0,
      D: 2,
      E: 4,
      F: 5,
      G: 7,
      A: 9,
      B: 11,
    };
    let accidental = {
      B: -1,
      "#": 1,
      "": 0,
    };
    let v = this.scale.trim().toUpperCase();
    let m = null;
    if (
      (m = v.match(
        /^([a-g])([#b]?)\s*(major|minor|acoustic|aeolian|ionian|dorian|algerian|locrian|lydian|major pentatonic|minor pentatonic|mixolydian|phrygian)$/i
      ))
    ) {
      let intervals = {
        MAJOR: [0, 2, 2, 1, 2, 2, 2, 1],
        MINOR: [0, 2, 1, 2, 2, 1, 2, 2],
        ACOUSTIC: [0, 2, 2, 2, 1, 2, 1, 2],
        AEOLIAN: [0, 2, 1, 2, 2, 1, 2, 2],
        ALGERIAN: [0, 2, 1, 3, 1, 1, 3, 1, 2, 1, 2],
        DORIAN: [0, 2, 1, 2, 2, 2, 1, 2],
        IONIAN: [0, 2, 2, 1, 2, 2, 2, 1],
        LOCRIAN: [0, 1, 2, 2, 1, 2, 2, 2],
        LYDIAN: [0, 2, 2, 2, 1, 2, 2, 1],
        "MAJOR PENTATONIC": [0, 2, 2, 3, 2, 3],
        "MINOR PENTATONIC": [0, 3, 2, 2, 3, 2],
        MIXOLYDIAN: [0, 2, 2, 1, 2, 2, 1, 2],
        PHRYGIAN: [0, 1, 2, 2, 2, 1, 2, 2],
      };
      let notes = [];
      for (let i = 0, k = 0, l = intervals[m[3]].length; i < l; ++i) {
        k += intervals[m[3]][i];
        notes.push((noteValue[m[1]] + accidental[m[2]] + k) % 12);
      }
      return notes;
    } else {
      return this.getValues(this.scale);
    }
  },

  scaleRendering() {
    return this.scaleInfo.map((rendering) => {
      return {
        radius: this.noteRadius,
        cx: rendering.x,
        cy: rendering.y,
        fill: rendering.fret === 0 ? "transparent" : rendering.color,
        stroke: rendering.fret === 0 ? rendering.color : "transparent",
      };
    });
  },
  scaleText() {
    return this.scaleInfo.map((rendering) => {
      // @displayIntervalsInsteadOfNotes
      return {
        text: rendering.note,
        x: rendering.x,
        y: rendering.y,
        fill: rendering.fret === 0 ? rendering.color : rendering.textColor,
      };
    });
  },
  startNormalized() {
    if (!this.start) return 0;
    let v = Math.max(0, Math.min(30, this.start * 1));
    if (this.fretsNormalized - v < 1) return this.fretsNormalized;
    return v;
  },
  stringRenderings() {
    let renderings = [];
    let ox = this.noteRadius * 1;
    let oy = this.start == 0 ? this.noteRadius * 2 : 0;
    let height =
      (this.isHorizontal ? this.width : this.height) -
      (this.start == 0 ? this.noteRadius * 2 : 0);
    for (let string = 0; string < this.instrument.strings; ++string) {
      let rendering = {
        x: ox,
        y: oy,
        height: height,
        width: this.stringSizeNormalized[string],
        color: this.stringColor,
      };
      if (this.isHorizontal) {
        rendering = {
          x: rendering.y,
          y: rendering.x,
          width: rendering.height,
          height: rendering.width,
          color: rendering.color,
        };
        if (this.instrument.leftDominantHand) {
          rendering.x = this.width - rendering.x - rendering.width;
        }
      }
      renderings.push(rendering);
      ox += this.stringSizeNormalized[string] + this.stringSpace * 1;
    }
    return renderings;
  },
  stringSizeNormalized() {
    let strings = [];
    let stringSizes = (this.stringSize + "")
      .split(/[,\s]+/)
      .filter((v) => v.match(/^[0-9]+([.][0-9]+)?$/));
    if (!stringSizes.length) stringSizes.push(1);
    for (let i = 0; i < this.instrument.strings; i++) {
      strings.push(
        stringSizes.length > 1 ? stringSizes.shift() * 1 : stringSizes[0] * 1
      );
    }
    if (this.isHorizontal || this.instrument.leftDominantHand) {
      strings.reverse();
    }
    return strings;
  },
  tuningNormalized() {
    let tuning = this.getValues(this.tuning).reverse();
    if (!this.isHorizontal && !this.instrument.leftDominantHand) {
      return tuning.reverse();
    } else {
      return tuning;
    }
  },
  widthHeight() {
    let height = 0;
    if (this.hasNut) {
      height += this.nutSize * 1;
      if (this.start == 0) height += this.noteRadius * 2;
    } else {
      height += this.fretSize * 1;
    }
    let frets = this.fretsNormalized - Math.max(0, this.startNormalized - 1);
    height += frets * this.fretSpace;
    height += this.fretSize * frets;

    let width = this.noteRadius * 2;
    width += (this.instrument.strings - 1) * this.stringSpace;
    for (let i = 0, l = this.stringSizeNormalized.length; i < l; i++) {
      width += this.stringSizeNormalized[i];
    }

    return {
      width: this.isHorizontal ? height : width,
      height: this.isHorizontal ? width : height,
    };
  },
  height() {
    return this.widthHeight.height;
  },
  width() {
    return this.widthHeight.width;
  },
  svgViewBox() {
    return `0 0 ${this.width} ${this.height}`;
  },
  svgStyle() {
    return `width:${this.width}px;height:${this.height}px;`;
  },
  hasNut() {
    return this.startNormalized <= 1;
  },
  isHorizontal() {
    return this.orientation === "horizontal";
  },
};
