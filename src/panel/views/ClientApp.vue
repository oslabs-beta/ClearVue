<template>
<div class="container-fluid">
  <div class="row gx-0">
    <div class="col">Left Column
      <div class="container-fluid">
        <div>Render D3 Tree here</div>
      </div>
    </div>
    <div class="col">
      Right Column
      <div class="container-fluid">
        <div class="right-col-panels">Top Right Div</div>
        <div class="right-col-panels">Bottom Right Div</div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
  .col, .right-col-panels {
    border-style:ridge
    /* border-width:5px */
  }
  .right-col-panels {
    min-height: 150px
  }
</style>
