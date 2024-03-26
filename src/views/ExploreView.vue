<template>
  <div class="about">
    <div class="card">
      <div class="top">
        <p>Drag & drop Images</p>
      </div>
      <div
        class="drag-area"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <span v-if="!isDragging">
          Drag & drop image here or
          <span class="select" @click="selectFiles" role="button"> Choose </span>
        </span>
        <div v-else class="select">Drop images here</div>
        <input
          type="file"
          name="file"
          class="file"
          ref="fileInput"
          multiple
          @change="onFileSelect"
        />
      </div>
      <div class="container">
        <div class="image" v-for="(image, index) in images" :key="index">
          <span class="delete" @click="deleteImage(index)">&times;</span>
          <img :src="image.url" alt="" />
        </div>
      </div>
      <button @click="uploadImage" type="button">Upload</button>
    </div>

    <div :class="{ 'popup': true, 'center': true ,'active':isOpenPopUp}">
      <div class="icon">
        <i class="fa-solid fa-thumbs-up thumbsup"></i>
      </div>
      <div class="title">Sucess!!</div>
      <div class="description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, quia.
      </div>
      <div class="dismiss-btn">
        <button @click="removePopop" id="dismiss-popup-btn">Dismiss</button>
      </div>
    </div>
  </div>
</template>

<script src="./js/explore.js"></script>

<style>
.card {
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 5px #ffdfdf;
  border-radius: 5px;
  overflow: hidden;
}
.card .top {
  text-align: center;
}
.card p {
  font-weight: bold;
  color: #00bd7e;
}
.card button {
  outline: 0;
  border: 0;
  color: #fff;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  width: 100%;
  background: #00bd7e;
}
.card .drag-area {
  height: 150px;
  border-radius: 5px;
  border: 2px dashed #00bd7e;
  background: #f4f3f9;
  color: #00bd7e;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  --webkit-user-select: none;
  margin-top: 10px;
}
.card .drag-area .visible {
  font-size: 18px;
}
.card .select {
  color: #5256ad;
  margin-left: 5px;
  cursor: pointer;
  transition: 0.4s;
}
.card .select:hover {
  opacity: 0.6;
}
.card .container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
  padding-top: 15px;
}
.card .container .image {
  width: 75px;
  margin-right: 5px;
  height: 75px;
  position: relative;
  margin-bottom: 8px;
}
.card .container .image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.card .container .image span {
  position: absolute;
  top: -2px;
  right: 9px;
  font-size: 20px;
  cursor: pointer;
}
.card input,
.card .drag-area .on-drop,
.card .drag-area.dragover .visible {
  display: none;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.popup {
  position: absolute;
  width: 350px;
  height: 280px;
  padding: 30px 20px;
  background: #f5f5f5;
  border-radius: 10px;
  box-sizing: border-box;
  z-index: 2;
  text-align: center;
  opacity: 0;
  top: -200%;
  transform: translate(-50%, -50%) scale(0.5);
  transition:
    opacity 300ms ease-in-out,
    top 1000ms ease-in-out,
    transform 1000ms ease-in-out;
}
.popup.active {
  opacity: 1;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: transform 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
}
.popup .icon {
  width: 50px;
  height: 50px;
  border: 2px solid #34f234;
  text-align: center;
  display: inline-block;
  border-radius: 50%;
}
.thumbsup {
  margin-top: 5px;
  font-size: 30px;
  color: #34f234;
}
.popup .title {
  margin: 5px 0px;
  font-size: 30px;
  font-weight: 600;
}
.popup .description {
  color: #222;
  font-size: 15px;
  padding: 5px;
}
.popup .dismiss-btn {
  margin-top: 15px;
}
.popup .dismiss-btn button {
  padding: 10px 20px;
  background: #111;
  color: #f5f5f5;
  border: 2px solid #111;
  font-size: 16px;
  font-weight: 600;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease-in-out;
}
.popup .dismiss-btn button:hover {
  color: #111;
  background: #f5f5f5;
}
</style>
