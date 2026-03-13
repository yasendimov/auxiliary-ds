<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MoonIcon } from '@heroicons/vue/16/solid'
import { SunIcon } from '@heroicons/vue/16/solid'

const route = useRoute()
const theme = ref(document.documentElement.dataset.theme || 'dark')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('aux-theme', theme.value)
}

const navSections = [
  {
    label: 'BRAND',
    items: [
      {
        number: '01',
        title: 'Identity',
        to: '/brand/identity',
        children: [
          { name: 'Mission', hash: '#mission' },
          { name: 'Brand Idea', hash: '#brand-idea' },
          { name: 'Visual Language', hash: '#visual-language' }
        ]
      },
      {
        number: '02',
        title: 'Logo',
        to: '/brand/logo',
        children: [
          { name: 'Intro', hash: '#intro' },
          { name: 'Construction', hash: '#construction' },
          { name: 'Usage', hash: '#usage' },
          { name: 'Color', hash: '#color' }
        ]
      },
      {
        number: '03',
        title: 'Typography',
        to: '/brand/typography',
        children: [
          { name: 'Type Scale', hash: '#type-scale' },
          { name: 'Using Type', hash: '#using-type' },
          { name: 'Formatting', hash: '#formatting' }
        ]
      },
      {
        number: '04',
        title: 'Color',
        to: '/brand/color',
        children: [
          { name: 'Introduction', hash: '#introduction' },
          { name: 'Primitives', hash: '#primitives' },
          { name: 'Semantic Tokens', hash: '#semantic-tokens' },
          { name: 'Themes', hash: '#themes' }
        ]
      },
      {
        number: '05',
        title: 'Iconography',
        to: '/brand/iconography',
        children: [
          { name: 'Overview', hash: '#overview' },
          { name: 'Product Symbols', hash: '#product-symbols' },
          { name: 'Functional Icons', hash: '#functional-icons' }
        ]
      },
      {
        number: '06',
        title: 'Photography',
        to: '/brand/photography',
        children: [
          { name: 'Style', hash: '#style' },
          { name: 'Product', hash: '#product' },
          { name: 'People', hash: '#people' },
          { name: 'Places', hash: '#places' }
        ]
      },
      {
        number: '07',
        title: 'Language',
        to: '/brand/language',
        children: [
          { name: 'Voice & Tone', hash: '#voice-and-tone' },
          { name: 'Writing Style', hash: '#writing-style' },
          { name: 'Product Names', hash: '#product-names' }
        ]
      },
      {
        number: '08',
        title: 'Gallery',
        to: '/brand/gallery',
        children: [
          { name: 'Marketing', hash: '#marketing' },
          { name: 'Applications', hash: '#application' },
          { name: 'Operations', hash: '#operations' },
          { name: 'Website', hash: '#website' }
        ]
      }
    ]
  },
  {
    label: 'DESIGN SYSTEM',
    items: [
      {
        number: '09',
        title: 'Tokens',
        to: '/system/tokens',
        children: [
          { name: 'Colors', hash: '#colors' },
          { name: 'Typography', hash: '#typography' },
          { name: 'Spacing', hash: '#spacing' },
          { name: 'Border Radius', hash: '#radius' },
          { name: 'Shadows', hash: '#shadows' },
          { name: 'Motion', hash: '#motion' },
          { name: 'Opacity', hash: '#opacity' },
          { name: 'Z-Index', hash: '#z-index' }
        ]
      },
      {
        number: '10',
        title: 'Core',
        to: '/design-system/core/button',
        children: [
          { name: 'Button', to: '/design-system/core/button' },
          { name: 'Badge', to: '/design-system/core/badge' },
          { name: 'Input', to: '/design-system/core/input' },
          { name: 'Checkbox', to: '/design-system/core/checkbox' },
          { name: 'Radio', to: '/design-system/core/radio' },
          { name: 'Toggle', to: '/design-system/core/toggle' },
          { name: 'Textarea', to: '/design-system/core/textarea' },
          { name: 'Alert', to: '/design-system/core/alert' },
          { name: 'Spinner', to: '/design-system/core/spinner' },
          { name: 'Avatar', to: '/design-system/core/avatar' },
          { name: 'Separator', to: '/design-system/core/separator' }
        ]
      },
      {
        number: '11',
        title: 'Marketing',
        to: '/design-system/marketing/hero',
        children: [
          { name: 'Hero', to: '/design-system/marketing/hero' },
          { name: 'Header', to: '/design-system/marketing/header' },
          { name: 'Section', to: '/design-system/marketing/section' }
        ]
      },
      {
        number: '12',
        title: 'Applications',
        to: '/design-system/applications',
        children: []
      },
      {
        number: '13',
        title: 'Operations',
        to: '/design-system/operations',
        children: []
      },
      {
        number: '14',
        title: 'Theme Test',
        to: '/design-system/theme-test/semantic',
        children: [
          { name: 'Semantic', to: '/design-system/theme-test/semantic' },
          { name: 'Marketing', to: '/design-system/theme-test/marketing' },
          { name: 'App Dashboard', to: '/design-system/theme-test/app-dashboard' },
          { name: 'Ops Swarm', to: '/design-system/theme-test/ops-swarm' },
          { name: 'Maven C2', to: '/design-system/theme-test/maven' }
        ]
      }
    ]
  }
]

const openItem = ref(null)

function isItemActive(item) {
  if (route.path === item.to) return true
  return item.children.some((child) => child.to && route.path === child.to)
}

function toggleItem(item) {
  if (openItem.value === item.number) {
    openItem.value = null
  } else {
    openItem.value = item.number
  }
}

function isOpen(key) {
  return openItem.value === key
}

function childLink(item, child) {
  // Route-based child (has its own `to`) vs hash-based child
  return child.to || item.to + child.hash
}

function isChildActive(item, child) {
  if (child.to) return route.path === child.to
  return route.path === item.to && route.hash === child.hash
}

// Auto-open the section that contains the active route
watch(
  () => route.path,
  () => {
    for (const section of navSections) {
      for (const item of section.items) {
        if (isItemActive(item)) {
          openItem.value = item.number
          return
        }
      }
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="flex min-h-screen bg-page text-content-high">
    <aside class="sticky top-0 h-screen flex w-64 shrink-0 flex-col border-r border-line bg-page">
      <!-- Header -->
      <div class="h-14 flex items-center justify-between px-5 border-b border-line">
        <router-link to="/" class="text-content-high">
          <svg class="h-4" viewBox="0 0 780 148" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M138 146.168L121.894 102.5L92.3311 119.492L99.8761 141.892C100.747 144.45 103.104 146.168 105.789 146.168H138ZM50.87 107.287L129.875 81.8905C131.144 81.4886 132.486 82.1463 132.922 83.3522C133.321 84.485 132.885 85.764 131.833 86.3487L31.1007 144.231C28.9243 145.51 26.4214 146.168 23.9185 146.168H6.54325C1.90018 146.168-1.25565 141.417.485501 137.105L54.0258 4.0927C55.0415 1.60785 57.4356 0 60.0836 0H79.5627C82.3195 0 84.7498 1.68093 85.693 4.27541L112.826 77.8344L81.7754 87.8103L71.655 57.6267C70.3491 53.7898 65.0168 53.6071 63.4933 57.3709L45.5015 101.44C44.123 104.875 47.3514 108.42 50.87 107.287ZM546.387 12.9949C546.387 8.39964 542.537 7.79893 536.807 9.50088L516.237 16.0784V34.4796H546.387V12.9949ZM317.937 70.4909V48.1552V48.1452H300.097V28.9532C300.097 24.3779 296.247 23.7773 290.517 25.4792L269.967 32.0567V48.1452H256.887V70.4809H269.947V118.947C269.857 125.544 271.187 131.01 273.927 135.345 276.667 139.68 280.607 142.874 285.727 144.916 290.837 146.949 296.977 147.83 304.107 147.529 307.807 147.359 310.957 146.959 313.597 146.348 316.227 145.737 318.277 145.187 319.717 144.726L315.127 122.781C314.447 122.961 313.447 123.151 312.137 123.392 310.807 123.632 309.547 123.752 308.307 123.752 306.617 123.752 305.147 123.502 303.917 122.991 302.687 122.481 301.737 121.62 301.077 120.408 300.427 119.187 300.097 117.555 300.097 115.463V70.4909H317.937ZM470.497 65.8356V51.8496C470.497 47.2543 466.637 46.6636 460.907 48.3555L441.247 54.6528V146.148H471.397V92.3661C471.397 88.4616 472.247 85.0177 473.977 82.0643 475.707 79.1109 478.047 76.7982 481.017 75.1463 483.977 73.4944 487.357 72.6535 491.147 72.6535 493.027 72.6535 495.137 72.8036 497.487 73.104 498.787 73.2641 500.017 73.5044 501.057 73.7347 501.907 73.9149 503.187 74.005 503.187 72.4933V49.9874C503.187 48.6459 502.327 47.6948 500.987 47.4545L500.786 47.4172C500.149 47.2984 499.501 47.1776 498.977 47.1141 497.457 46.9239 495.967 46.8338 494.527 46.8338 489.137 46.8338 484.397 48.4156 480.317 51.5592 476.247 54.7028 473.317 59.4583 471.527 65.8456H470.497V65.8356ZM378.737 148C368.537 148 359.747 145.968 352.387 141.903 345.027 137.838 339.357 132.032 335.407 124.483 331.457 116.934 329.477 107.944 329.477 97.5221 329.477 87.4004 331.457 78.5403 335.437 70.9515 339.417 63.3628 344.997 57.4561 352.227 53.2212 359.457 48.9863 367.967 46.8739 377.787 46.8739 384.627 46.8739 390.927 47.9451 396.657 50.0976 402.387 52.2401 407.367 55.4337 411.567 59.6686 415.767 63.9035 419.027 69.1194 421.357 75.3266 423.677 81.5337 424.827 88.7019 424.827 96.8313V104.56H359.277V105.221C359.277 109.426 360.097 113.09 361.737 116.224 363.377 119.357 365.687 121.77 368.677 123.502 371.667 125.234 375.227 126.085 379.357 126.085 382.157 126.085 384.717 125.694 387.027 124.904 389.347 124.113 391.327 122.951 392.987 121.399 394.637 119.848 395.887 117.966 396.737 115.753L424.407 116.764C424.417 116.764 424.417 116.764 424.427 116.774 424.427 116.774 424.437 116.774 424.437 116.784V116.794V116.814C423.247 123.141 420.657 128.628 416.667 133.293 412.677 137.979 407.477 141.603 401.057 144.176 394.607 146.719 387.177 148 378.737 148ZM361.847 77.9596C360.297 80.5626 359.447 83.4959 359.287 86.7597H396.707C396.667 83.2657 395.857 80.1821 394.297 77.489 392.717 74.7859 390.577 72.6735 387.837 71.1418 385.097 69.61 381.937 68.8491 378.377 68.8491 374.777 68.8491 371.507 69.6801 368.637 71.342 365.747 72.9839 363.487 75.2064 361.847 77.9596ZM516.247 146.148V48.1553H537.807H546.397V146.148H516.247ZM611.967 147.99C601.767 147.99 593.007 145.878 585.677 141.643 578.347 137.408 572.697 131.511 568.757 123.902 564.807 116.314 562.827 107.494 562.827 97.462 562.827 87.3804 564.807 78.5403 568.757 70.9515 572.707 63.3628 578.347 57.4561 585.677 53.2212 593.007 48.9863 601.767 46.8739 611.967 46.8739 622.157 46.8739 630.927 48.9863 638.257 53.2212 645.587 57.4561 651.227 63.3628 655.177 70.9515 659.127 78.5403 661.107 87.3804 661.107 97.462 661.107 107.504 659.127 116.314 655.177 123.902 651.227 131.491 645.587 137.408 638.257 141.643 630.927 145.888 622.157 147.99 611.967 147.99ZM612.157 125.094C616.057 125.094 619.357 123.912 622.057 121.56 624.757 119.207 626.807 115.923 628.237 111.728 629.667 107.544 630.367 102.728 630.367 97.2818 630.367 91.7955 629.647 86.9699 628.237 82.8051 626.807 78.6404 624.757 75.3566 622.057 72.9739 619.367 70.5911 616.057 69.4098 612.157 69.4098 608.117 69.4098 604.727 70.6012 601.967 72.9739 599.197 75.3666 597.107 78.6304 595.677 82.8051 594.247 86.9799 593.547 91.7955 593.547 97.2818 593.547 102.718 594.267 107.534 595.677 111.728 597.107 115.923 599.197 119.207 601.967 121.56 604.707 123.912 608.117 125.094 612.157 125.094ZM243.247 51.5693V146.148H214.437V128.027H213.427C211.267 133.944 207.577 138.639 202.377 142.163 197.177 145.667 190.907 147.429 183.607 147.429 176.937 147.429 171.077 145.908 166.047 142.864 161.017 139.821 157.097 135.546 154.327 130.039 151.547 124.533 150.127 118.056 150.087 110.607V54.6428L170.637 48.0852C176.367 46.3833 180.217 46.984 180.217 51.5792V104.81C180.257 110.207 181.687 114.492 184.517 117.635 187.347 120.779 191.207 122.361 196.087 122.361 199.227 122.361 202.087 121.65 204.667 120.218 207.247 118.786 209.297 116.724 210.847 114.001 212.397 111.288 213.157 107.934 213.107 103.979V54.6528L233.657 48.0953C239.397 46.3933 243.247 46.994 243.247 51.5693ZM706.207 51.5793C706.207 46.984 702.347 46.3933 696.617 48.0853L677.537 54.1823V146.158H707.687V90.0735C707.717 86.2391 708.447 82.9653 709.847 80.2122 711.247 77.469 713.227 75.3666 715.777 73.8849 718.327 72.4032 721.287 71.6824 724.637 71.6824 729.687 71.6824 733.647 73.2642 736.527 76.4078 739.387 79.5514 740.797 83.9064 740.757 89.4828V146.158H770.907V83.6962C770.947 76.2877 769.567 69.8303 766.767 64.3239 763.947 58.8176 760.007 54.5227 754.907 51.4692 749.817 48.4157 743.837 46.8739 737.007 46.8739 729.787 46.8739 723.557 48.5759 718.357 51.9697 713.157 55.3636 709.477 60.039 707.307 65.9458H706.217V52.3902V51.5793H706.207Z"
              fill="currentColor"
            />
          </svg>
        </router-link>
        <button
          class="text-content-dim transition-colors duration-instant hover:text-content-high"
          @click="toggleTheme"
        >
          <MoonIcon v-if="theme === 'dark'" class="size-4" />
          <SunIcon v-else class="size-4" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto">
        <template v-for="section in navSections" :key="section.label">
          <!-- Section label -->
          <div class="type-overline font-mono text-content-dim px-5 pt-5 pb-2">
            {{ section.label }}
          </div>

          <!-- Items -->
          <div v-for="item in section.items" :key="item.number">
            <!-- Top-level item -->
            <router-link
              :to="item.to"
              class="flex w-full items-center gap-2 px-5 py-1.5 type-caption-m transition-colors duration-instant"
              :class="
                isItemActive(item)
                  ? 'text-content-high'
                  : 'text-content-low hover:text-content-high'
              "
              @click="toggleItem(item)"
            >
              <span class="type-overline font-mono tabular-nums w-4 shrink-0">{{
                item.number
              }}</span>
              <span>{{ item.title }}</span>
            </router-link>

            <!-- Children (animated expand/collapse) -->
            <div
              class="grid transition-[grid-template-rows] duration-fast"
              :class="isOpen(item.number) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <div class="pb-1">
                  <router-link
                    v-for="child in item.children"
                    :key="child.to || child.hash"
                    :to="childLink(item, child)"
                    class="block py-1 pl-11 pr-5 type-caption-m transition-colors duration-instant"
                    :class="
                      isChildActive(item, child)
                        ? 'text-content-high'
                        : 'text-content-low hover:text-content-high'
                    "
                  >
                    {{ child.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </nav>

      <!-- Footer -->
      <div class="border-t border-line px-5 py-3">
        <span class="type-overline font-mono text-content-dim">v0.0.0</span>
      </div>
    </aside>

    <main class="flex-1 bg-page min-h-screen">
      <router-view />
    </main>
  </div>
</template>
