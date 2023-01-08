<template>
	<div class="userbar-container">
		<div class="top-content">
			<a-typography-title :level="2"></a-typography-title>
		</div>
		<div class="bottom-content">
			<a-typography-title :level="5">0 Posts</a-typography-title>
			<a-typography-title :level="5">200 Followers</a-typography-title>
			<a-typography-title :level="5">412 Following</a-typography-title>
		</div>
	</div>
</template>

<style scoped>
.userbar-container {
	padding-bottom: 75px;
}
.bottom-content {
	display: flex;
	align-items: center;
}
.bottom-content h5 {
	margin: 0 !important;
	padding: 0;
	margin-right: 30px !important;
}
</style>