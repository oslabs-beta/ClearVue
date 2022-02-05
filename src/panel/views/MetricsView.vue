<template>
  <div>
    <table class='table table-dark'>
      <thead>
        <tr>
          <th scope='col'>Metrics</th>
          <th scope='col'>Time (ms)</th>
          <th scope='col'>Passable Threshold</th>
          <th scope='col'>Critical Threshold</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>CLS</th>
          <td>{{ metrics.CLS }}</td>
          <td>100 ms</td>
          <td>250 ms</td>
        </tr>
        <tr>
          <th scope='row'>FCP</th>
          <td>{{ metrics.FCP }}</td>
          <td>1800 ms</td>
          <td>3000 ms</td>
        </tr>
        <tr>
          <th scope='row'>LCP</th>
          <td>{{ metrics.LCP }}</td>
          <td>2500 ms</td>
          <td>4000 ms</td>
        </tr>
        <tr>
          <th scope='row'>TTFB</th>
          <td>{{ metrics.TTFB }}</td>
          <td>100 ms</td>
          <td>500 ms</td>
        </tr>
        <tr>
          <th scope='row'>FID</th>
          <td>{{ metrics.FID }}</td>
          <td>100 ms</td>
          <td>300 ms</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <div class='accordion bg-dark' id='accordionExample'>
      <div class='accordion-item bg-dark'>
        <h2 class='accordion-header' id='headingOne'>
          <button
            class='accordion-button bg-dark text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseOne'
            aria-expanded='false'
            aria-controls='collapseOne'
          >
            Cumulative Layout Shift (CLS)
          </button>
        </h2>
        <div
          id='collapseOne'
          class='accordion-collapse collapse'
          aria-labelledby='headingOne'
          data-bs-parent='#accordionExample'
        >
          <div class='accordion-body text-light'>
            CLS is a measure of the largest burst of layout shift scores for every unexpected layout
            shift that occurs during the entire lifespan of a page. A layout shift occurs any time a
            visible element changes its position from one rendered frame to the next.
          </div>
        </div>
      </div>
      <div class='accordion-item bg-dark'>
        <h2 class='accordion-header' id='headingTwo'>
          <button
            class='accordion-button bg-dark text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseTwo'
            aria-expanded='false'
            aria-controls='collapseTwo'
          >
            The First Contentful Paint (FCP)
          </button>
        </h2>
        <div
          id='collapseTwo'
          class='accordion-collapse collapse'
          aria-labelledby='headingTwo'
          data-bs-parent='#accordionExample'
        >
          <div class='accordion-body text-light'>
            The First Contentful Paint (FCP) metric measures the time from when the page starts
            loading to when any part of the page's content is rendered on the screen. For this
            metric, 'content' refers to text, images (including background images),
            <code> svg </code> elements, or non-white <code> canvas </code> elements.
          </div>
        </div>
      </div>
      <div class='accordion-item bg-dark'>
        <h2 class='accordion-header' id='headingThree'>
          <button
            class='accordion-button bg-dark text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseThree'
            aria-expanded='false'
            aria-controls='collapseThree'
          >
            Largest Contentful Paint (LCP)
          </button>
        </h2>
        <div
          id='collapseThree'
          class='accordion-collapse collapse'
          aria-labelledby='headingThree'
          data-bs-parent='#accordionExample'
        >
          <div class='accordion-body text-light'>
            The Largest Contentful Paint (LCP) metric reports the render time of the largest image
            or text block visible within the viewport, relative to when the page first started
            loading.
          </div>
        </div>
      </div>
      <div class='accordion-item bg-dark'>
        <h2 class='accordion-header' id='headingFour'>
          <button
            class='accordion-button bg-dark text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseFour'
            aria-expanded='false'
            aria-controls='collapseFour'
          >
            Time to First Byte (TTFB)
          </button>
        </h2>
        <div
          id='collapseFour'
          class='accordion-collapse collapse'
          aria-labelledby='headingFour'
          data-bs-parent='#accordionExample'
        >
          <div class='accordion-body text-light'>
            The Time to First Byte (TTFB) measures the time between the request for a resource and
            when the first byte of a response begins to arrive. It helps identify when a web server
            is running too slow to respond to requests.
          </div>
        </div>
      </div>
      <div class='accordion-item bg-dark'>
        <h2 class='accordion-header' id='headingFive'>
          <button
            class='accordion-button bg-dark text-light collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseFive'
            aria-expanded='false'
            aria-controls='collapseFive'
          >
            First Input Delay (FID)
          </button>
        </h2>
        <div
          id='collapseFive'
          class='accordion-collapse collapse'
          aria-labelledby='headingFive'
          data-bs-parent='#accordionExample'
        >
          <div class='accordion-body text-light'>
            First Input Delay (FID) measures the time when a user first interacts with the page
            (when they click or hit a button) to the time when the browser is actually able to first
            begin processing event handlers in response to that interaction.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Metrics',
  computed: {
    metrics() {
      return this.$store.state.webVitals;
    },
  },
});
</script>
