<template>
    <div class="min-h-screen flex flex-col">
      <CommonFloatingSidebar />


      <CommonNavgBar/>
      <main class="flex-grow">
        <slot />
      </main> 
      <CommonFooter />
    </div>
</template>