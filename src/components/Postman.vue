<template>
  <div class="container">


    <functionList class="left-side"
                  @selectListItem="parseListItems($event)"
                  :list="functionList" />

    <div class="right-side">

      <div class="head">

        <selectList :options="optionList" />


        <input class="link" placeholder="Path" v-model="selectedListItem.url" @input="changeParamsHandler" />

        <button class="sendButton">Send</button>

      </div>

      <div class="body">
        <div class="title">
          <span class="parameter">Parameter</span>
          <span class="value">Value</span>

        </div>
        <!--                        -->

        <div class="content">
          <content-item v-for="(listItem, idx) in parsedListParams"
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
  watch
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
    const parsedListParams = ref([])
    const currentStringItemsObject = ref({})

    const LOCALE_STRING = ref('')

    /* Methods */

    const cloneObjects = obj => {
      const clone = {}
      for (let key in obj) {
        if (typeof clone[key] !== 'object') clone[key] = obj[key]
      }
      return clone
    }


    const parsePathParams = (url) => {
      const path = []
      url?.split('/').forEach(item => {
        if (item[0] === '{') {
          const newPathItem = item?.match(/\{([^}]+)\}/)[0]
          path.push(newPathItem)
        }
      })
      return path
    }

    const parseQueryParams = (url) => {
      if (url.split('?')[1]) return url.split('?')[1].split('&')
    }

    const updateUrl = item => {
      currentStringItemsObject.value[item.title] = item.modelValue

      let clonedValue = LOCALE_STRING.value

      const selectedURL = selectedListItem.value

      for (let key in currentStringItemsObject.value) {
        clonedValue = clonedValue.replace(key, currentStringItemsObject.value[key])
      }

      selectedURL.url = clonedValue
    }

    const currentMutableValue = ref(null)

    const changeParamsHandler = (val) => {
      const selectedURL = selectedListItem.value
      const deletedItems = findDeletedElements(selectedURL.url, parsedListParams.value)

      findCurrentMutableValue(deletedItems)

      const paramsItem = parsedListParams.value.find(item => item.title === currentMutableValue.value).parameters

      if (val.data && currentMutableValue.value) {
        paramsItem.push(val.data)
      } else {
        paramsItem.pop(val.data)
      }
    }

    const findCurrentMutableValue = deletedItemsArray => {
      deletedItemsArray.forEach(item => {
        !currentMutableValue.value ? currentMutableValue.value = item :
            currentMutableValue.value = currentMutableValue.value === item ?  currentMutableValue.value : item
      })
    }

    const findDeletedElements = (url, array) => {
      const deletedArr = []
      array.forEach(item => {
        if (!url.includes(item.title)) deletedArr.push(item.title)
      })
      return deletedArr
    }

    const parseListItems = (item) => {
      selectedListItem.value = item

      LOCALE_STRING.value = item.url

      if (selectedListItem.value.url.trim() !== '') {

        const pathParams = parsePathParams(selectedListItem.value.url)
        const queryParams = parseQueryParams(selectedListItem.value.url)

        const parsedParams = [...pathParams  || [], ...queryParams  || []]

        parsedListParams.value = parsedParams.map(item => {
          return {
            title: item,
            modelValue: '',
            parameters: [],
            checked: true
          }
        })
      }
    }

    onBeforeMount(() => {
      parseListItems(selectedListItem.value)
    })

    return {
      optionList,
      functionList,
      selectedListItem,
      parsedListParams,
      parseListItems,
      updateUrl,
      changeParamsHandler
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
