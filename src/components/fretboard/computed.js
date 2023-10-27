export default {
  instrument() {
    return this.$store.getters.instrument;
  },
  ariaDescId() {
    return "dt-fretboard-desc-" + this.ariaId;
  },
  ariaDescText() {
    return "Scale: " + 'this.scale' + "; Tuning: " + this.tuning;
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
    let fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24]
    let oy = this.start == 0 ? this.note.radius * 2 : 0;
    for (
      let fret = 0, length = this.fretsNormalized + 1;
      fret <= length;
      fret++
    ) {
      let rendering = {
        height: fret == 0 && this.hasNut ? this.nut.size * 1 : this.fret.size * 1,
        width:
          (this.isHorizontal ? this.height : this.width) - this.note.radius * 2,
        y: oy,
        x: this.note.radius * 1,
        color: fret == 0 && this.hasNut ? this.nut.color : 
        fretMarkers.includes(fret) ? this.fret.colored : this.fret.color,

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
      oy += fret == 0 && this.hasNut ? this.nut.size * 1 : this.fret.size * 1;
      oy += this.fret.space * 1;
    }
    return renderings;
  },

  fretMarkerRendering() {
    if (!(this.inlay.positions + "").length) {
      return [];
    }
    let neck = {};
    let referenceDots = this.inlay.positions.trim().split(/\s+/);
    referenceDots.forEach(function (referenceDot) {
      if (!Object.prototype.hasOwnProperty.call(neck, referenceDot)) {
        neck[referenceDot] = 0;
      }
      ++neck[referenceDot];
    });

    let ox = 0;
    let renderings = [];
    Object.entries(neck).forEach((referenceDot) => {
      if (
        referenceDot[0] < this.startNormalized ||
        referenceDot[0] > this.frets + this.startNormalized
      )
        return;
      for (let dot = 0; dot < referenceDot[1]; ++dot) {
        let rendering = {};
        rendering.radius = this.inlay.radius * 1;
        rendering.fill = this.inlay.color;
        let mid = Math.floor(this.instrument.strings / 2);
        rendering.cx =
          1 +
          (mid > 0
            ? this.stringSizeNormalized.slice(0, mid).reduce((r, n) => r + n)
            : 0) +
          this.string.space * (mid - 0.5) +
          this.note.radius / 2 +
          this.inlay.radius / 2 +
          ox;
        if (referenceDot[1] > 1) {
          rendering.cx +=
            (this.stringSizeNormalized[mid + (dot === 0 ? -1 : 0)] +
              this.string.space * 1) *
            (dot === 0 ? -1 : 1);
        }
        let cy = 0;
        if (this.startNormalized === 0) cy += this.note.radius * 2;
        let offset = referenceDot[0] - (this.startNormalized || 1);
        cy += this.hasNut ? this.nut.size * 1 : this.fret.size * 1;
        cy += this.fret.size * offset;
        cy += this.fret.space * offset;
        cy += this.fret.space / 2;
        rendering.cy = cy;
        renderings.push(rendering);
        if (this.isHorizontal) {
          let temp = rendering.cx;
          rendering.cx = rendering.cy;
          // TODO : this is dirty... but at least the functionality is here
          // calculate the y placement of the dot based on the width of the neck 
          switch(this.instrument.strings) { 
            case 5: { 
              rendering.cy = temp * 5.3/4;
              break;
            }
            case 7: { 
              rendering.cy = (temp + 1) * 7.2/6;
              break;
            }
            default: { 
              rendering.cy = temp + 2;
              break;
            }
          } 
          if (this.instrument.leftDominantHand) {
            rendering.cx = this.width - rendering.cx;
          }
        }
      }
    });
    return renderings;
  },

  scaleInfo() {
    if (!this.intervals.length || !this.tuningNormalized.length) {
      return [];
    }

    let renderings = [];
    let start = this.startNormalized;
    let frets = this.fretsNormalized;
    let ox = 0;
    for (let string = 0; string < this.instrument.strings; ++string) {
      let oy = start > 0 ? (start === 1 ? this.nut.size : this.fret.size) * 1 : 0;
      for (let fret = start; fret <= frets; ++fret) {
        let rendering = {};
        rendering.x =
          ox + this.stringSizeNormalized[string] / 2 + this.note.radius * 1;
        let value = (fret + this.tuningNormalized[string]) % 12;
        let index = this.intervals.indexOf(value);
        if (~index) {
          let ny = fret === 0 ? this.note.radius * 1 : this.fret.space / 2;
          rendering.y = oy + ny;
          rendering.fret = fret;
          rendering.note = this.noteNames[value];
          rendering.color = index === 0 ? this.note.root.color : this.note.color;
          rendering.textColor =
            index === 0 ? this.note.root.textColor : this.note.textColor;
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
          oy += this.note.radius * 2 + this.nut.size * 1;
        } else {
          oy += this.fret.space * 1 + this.fret.size * 1;
        }
      }
      ox += this.string.space * 1 + this.stringSizeNormalized[string];
    }
    return renderings;
  },
  scaleRendering() {
    return this.scaleInfo.map((rendering) => {
      return {
        radius: this.note.radius,
        cx: rendering.x,
        cy: rendering.y,
        fill: rendering.fret === 0 ? "transparent" : rendering.color,
        stroke: rendering.fret === 0 ? rendering.color : "transparent",
      };
    });
  },
  scaleText() {
    return this.scaleInfo.map((rendering) => {
      // TODO
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
    let ox = this.note.radius * 1;
    let oy = this.start == 0 ? this.note.radius * 2 : 0;
    let height =
      (this.isHorizontal ? this.width : this.height) -
      (this.start == 0 ? this.note.radius * 2 : 0);
    for (let string = 0; string < this.instrument.strings; ++string) {
      let rendering = {
        x: ox,
        y: oy,
        height: height,
        width: this.stringSizeNormalized[string],
        color: this.string.color,
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
      ox += this.stringSizeNormalized[string] + this.string.space * 1;
    }
    return renderings;
  },
  stringSizeNormalized() {
    let strings = [];
    let stringSizes = (this.string.size + "")
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
      height += this.nut.size * 1;
      if (this.start == 0) height += this.note.radius * 2;
    } else {
      height += this.fret.size * 1;
    }
    let frets = this.fretsNormalized - Math.max(0, this.startNormalized - 1);
    height += frets * this.fret.space;
    height += this.fret.size * frets;

    let width = this.note.radius * 2;
    width += (this.instrument.strings - 1) * this.string.space;
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
