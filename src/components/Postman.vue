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
                        @updatedInput="contentItemUpdate"
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

    const processStringToObject = (arr) => {
      return arr.map(item => ({ title: item.replace(/[^a-zа-яё]/gi, ''), checked: true, modelValue: '' }))
    }

    const parsePath = (url) => {
      const path = []
      url?.split('/').forEach(item => {
        if (item[0] === '{') {
          path.push(item?.match(/\{([^}]+)\}/)[0])
        }
      })
      return path
    }

    const parseQueryParams = (url) => {
      if (url.split('?')[1]) return url.split('?')[1].split('&')
    }

    const contentItemUpdate = item => {
      if (item.checked) {
        findCorrespondingItem(item)
      }
    }

    const findCorrespondingItem = (item) => {
      const mainURL = selectedListItem.value.url
      if (mainURL.indexOf(item.title) !== -1) {
        const leftSide = mainURL.substring(0, mainURL.indexOf(item.title) - 1)
        const rightSide = mainURL.substring(mainURL.indexOf(item.title) + item.title.length + 1)
        selectedListItem.value.url = leftSide.concat(item.modelValue).concat(rightSide)
      } else {

        // TODO needs to be updated with some logic

      }
    }

    const parseListItems = (item) => {
      selectedListItem.value = item
      if (selectedListItem.value.url.trim() !== '') {
        const pathParams = parsePath(selectedListItem.value.url) || []
        const queryParams = parseQueryParams(selectedListItem.value.url) || []

        if (pathParams.length && queryParams.length) {
          parsedListItems.value = processStringToObject([...pathParams, ...queryParams])
          return {
            pathParams: [...pathParams],
            queryParams: [...queryParams]
          }
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
      contentItemUpdate,
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