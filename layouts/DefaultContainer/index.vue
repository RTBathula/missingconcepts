<template>
  <div class="dcontainer">
  	<template v-if="alertConf && alertConf.message">
  		<Alert :message="alertConf.message" />
  	</template>
  	<Header />
  	<div class="dcontainer__router">
      <nuxt-child />
    </div>
	<Footer />
  </div>
</template>

<script src="./control.js" scoped></script>
<style src="./style.scss" lang="scss" scoped></style>
