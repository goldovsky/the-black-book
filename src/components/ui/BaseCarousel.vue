<template>
  
</template>

<script>
export default {

}
</script>

<style>
/* html,
body {
  padding: 0;
  margin: 20;
  height: 100%;
  font-style: normal;
  background-color: #F2F2F5;
} */

.product-card {
  background-color: white;
  padding: 35px 15px 10px 15px;
  margin: 40px 10px;
  max-width: 230px;
  min-height: 210px;
  border-radius: 5px;
  position: relative;
  font-family: "roboto", Sans-Serif;
  text-align: center;
}
.product-card .product-tag {
  position: absolute;
  right: -6px;
  top: 15px;
  background-color: #FFD95B;
  font-size: 10px;
  padding: 7px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.21);
}
.product-card .circle {
  height: 120px;
  width: 120px;
  background-color: #F2F2F5;
  border-radius: 50%;
  display: inline-block;
  position: relative;
}
.product-card .circle img {
  width: 70px;
  height: auto;
  margin: 0 auto;
}
.product-card .circle img.resize {
  width: 140px;
  position: absolute;
  top: 25%;
  left: 0;
}
.product-card .circle img.resizeMed {
  width: 100px;
}
.product-card .product-info {
  display: flex;
  align-items: center;
  margin-top: 25px;
  margin-left: 5px;
}
.product-card .product-info img {
  width: 40px;
  height: auto;
}
.product-card .product-info .product-text {
  font-size: 12px;
  text-align: left;
  margin-left: 15px;
}
.product-card .product-info .product-text p {
  margin: 4px 0;
}
.product-card .product-info .product-pts {
  color: #EB1265;
  font-weight: 600;
}

.carousel-3d-slide {
  border: none !important;
  background: none !important;
  width: 230px !important;
}
.carousel-3d-slide.current .product-card {
  box-shadow: 0px 20px 18px -10px rgba(0, 0, 0, 0.12);
}
</style>