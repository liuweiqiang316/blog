<template>
  <footer class="footer-wrapper">
    <div v-if="showFooter" class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank"
        >粤ICP备2023038279号-1
      </a>
      <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030902003858" target="_blank"
        >粤公网安备 44030902003858号
      </a>
    </div>
    <div class="copyright">Copyright © 2023 微斯人</div>
  </footer>
</template>

<script setup>
const BASE_URL = import.meta.env.BASE_URL
const showFooter = BASE_URL === '/'
</script>

<style lang="scss" scoped>
.footer-wrapper {
  position: relative;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-inline-start: calc(var(--sidebar-space) + 2rem);
  padding-inline-end: 2rem;
  border-top: 1px solid var(--border-color);

  background: var(--bg-color);
  color: var(--dark-grey);

  text-align: center;

  transition: border-top-color var(--color-transition),
    background var(--color-transition), padding var(--transform-transition);

  @media (max-width: hope-config.$tablet) {
    padding-inline-start: 2rem;
  }

  @media (min-width: hope-config.$pc) {
    z-index: 50;
    padding-inline-start: 2rem;
  }

  @media print {
    margin: 0 !important;
    padding: 0 !important;
  }

  @media (max-width: hope-config.$mobile) {
    display: block;
  }

  .no-sidebar &,
  .sidebar-collapsed & {
    padding-inline-start: 2rem;
  }

  .footer {
    margin: 0.5rem 1rem;
    font-size: 14px;
    display: flex;
    gap: 50px;

    @media print {
      display: none;
    }
  }

  .copyright {
    margin: 6px 0;
    font-size: 13px;
  }
}

.page:not(.not-found) + .footer-wrapper {
  margin-top: -2rem;
}
</style>
