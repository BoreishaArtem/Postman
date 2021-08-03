<template>
  <div class="container">

    <functionList class="left-side"
                  @selectListItem="parseListItems($event)"
                  :list="functionList" />

    <div class="right-side">

      <div class="head">

        <selectList :options="optionList" />
        <input class="link" placeholder="Path" v-model="selectedListItem.url" />

        <button class="sendButton">Send</button>

      </div>

      <div class="body">
        <div class="title">
          <span class="parameter">Parameter</span>
          <span class="value">Value</span>

        </div>

        <div class="content">
          <content-item v-for="(listItem, idx) in parsedListItems"
                        :key="idx"
                        :item="listItem"
                        @updatedInput="updateUrl"
          />
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {
  ref,
  onBeforeMount,
  // computed
} from 'vue';

import selectList from "./selectList";
import functionList from "./functionList";
import contentItem from "./contentItem";

export default {
  name: 'Postman',
  components: {
    selectList,
    functionList,
    contentItem,
  },
  setup() {

    /* Data */

    const optionList = ref([
      { title: 'GET', value: 'GET' },
      { title: 'PUT', value: 'PUT' },
      { title: 'PATCH', value: 'PATCH' },
      { title: 'POST', value: 'POST' },
      { title: 'DELETE', value: 'DELETE' }
    ])
    const functionList = ref([
      {
        title: 'fes-devstage',
        method: 'GET',
        url: 'http://fes-devstage:8765/fes/station/{stationId}/leaningConfig/{learningConfigid}/fit?*fromDate=&*toDate=&predictor=&*additionalInfo='
      },

      {
        title: 'carshop',
        method: 'PATCH',
        url: 'http://carshop:8080/car/{id}/wheels/{type}?price=&*name='
      },

      {
        title: 'users',
        method: 'DELETE',
        url: 'http://users:8080/user/{id}'
      },

      {
        title: 'huinia',
        method: 'GET',
        url: 'http://huinia:9087/country/{countryName}/user/{id}?name=&*age=&phone=&*email='
      }
    ])
    const selectedListItem = ref(functionList.value[0])
    const parsedListItems = ref([])

    /* Methods */

    const clearStrFromSymbols = strArr => strArr.map(item => item.replace(/[^a-zа-яё]/gi, ''))

    const parsePathParams = (url) => {
      const path = []
      url?.split('/').forEach(item => {
        if (item[0] === '{') {
          const newPathItem = item?.match(/\{([^}]+)\}/)[0]
          path.push(newPathItem)
        }
      })
      return clearStrFromSymbols(path)
    }

    const parseQueryParams = (url) => {
      if (url.split('?')[1]) return clearStrFromSymbols(url.split('?')[1].split('&'))
    }

    const updateUrl = item => {
      const mainUrl = selectedListItem.value
    }

    const parseListItems = (item) => {
      selectedListItem.value = item
      if (selectedListItem.value.url.trim() !== '') {
        const pathParams = parsePathParams(selectedListItem.value.url) || []
        const queryParams = parseQueryParams(selectedListItem.value.url) || []


        if (pathParams.length && queryParams.length) {
          parsedListItems.value = [...pathParams, ...queryParams].map(item => ({
            title: item,
            modelValue: '',
            checked: true
          }))
        }
      }
    }

    onBeforeMount(() => {
      parseListItems(selectedListItem.value)
    })

    return {
      optionList,
      functionList,
      selectedListItem,
      parseListItems,
      parsedListItems,
      updateUrl,
    }
  }
}

</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 5rem;
}

.checkParameter {
  width: 15%;
  display: inline-block;
  text-align: left;
}

.left-side {
  flex-basis: 20%;
}

.right-side {
  flex-basis: 80%;
  padding-right: 9rem;
}

.select {
  width: 10%;
}

.link {
  width: 70%;
}

.head {
  display: flex;
  justify-content: space-between;
}

.head button {
  width: 10%;
}

.body .title {
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  padding-right: 10rem;
}

.content .value {
  width: 80%;
  margin-left: 5px;
}
</style>