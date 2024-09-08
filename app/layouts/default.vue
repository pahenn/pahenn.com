<template>
  <div class="flex flex-col items-center mx-4">
    <div class="flex flex-col w-full">
      <header class="flex justify-between items-baseline py-2 w-full">
        <NuxtLink to="/">
          <h1 class="md:text-xl font-bold">pahenn.com</h1>
        </NuxtLink>
        <nav>
          <ul class="flex space-x-4 items-center justify-center">
            <li>
              <NuxtLink
                to="https://www.linkedin.com/in/hennesseypatrick/"
                target="_blank"
                external
              >
                <Icon
                  name="bxl:linkedin"
                  class="size-6 m-auto"
                />
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="https://x.com/pahennessey"
                target="_blank"
                external
              >
                <Icon
                  name="bxl:twitter"
                  class="size-6"
                />
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="w-full border-b border-gray-200"></div>
    <div class="flex flex-col w-full mt-20 py-4 items-center">
      <slot />
    </div>
  </div>
</template>
