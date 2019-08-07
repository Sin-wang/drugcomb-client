import {axios} from '../axios/api.request'

export const getDrugCombPagination = (page, size) => {
  return axios.get(`/combination/list`, {
    params: {
      page,
      size
    },
    retry: 1, // 设置超时重发
    retryDelay: 1000
  })
}

export const getDrugIntegrationPages = (page, size, checkedNames, checkedTissue) => { // 在这里把page和size都传了进去
  return axios.get(`/integration/list`, {
    params: {
      page,
      size,
      checkedNames,
      checkedTissue
    }
  })
}

export const getIndividualDrugCombinationByBlockId = (blockId) => {
  return axios.get(`/combination/list/${blockId}`)
}

export const getIndividualDrugIntegrationByBlockId = (blockId) => {
  return axios.get(`/integration/list/${blockId}`)
}

export const getDrugInfoByDrugName = name => {
  return axios.get(`/chemical/info/${name}`)
}
export const getDrugInfoByDrugNames = (name1, name2) => {
  return axios.get(`/chemical/combinfo`, {
    timeout: 30000,
    params: {
      name1,
      name2
    }
  })
}
export const getDrugInfoExtraByDrugId = id => {
  return axios.get(`/chemical/extra/${id}`)
}
export const getDrugInfoDescriptionByDrugId = id => {
  return axios.get(`/chemical/description/${id}`)
}

export const getCellLineInfoByBlockId = (blockId) => {
  return new Promise((resolve, reject) => {
    getIndividualDrugIntegrationByBlockId(blockId).then(data => {
      return data
    }).then(data => {
      resolve(axios.get(`/cellLine/cellName?q=${encodeURIComponent(data.cellName)}`))
    })
  })
}

export const getInfoByBlockId = (blockId) => {
  return axios.get(`/cellLine/blockId`, {
    params: {
      blockId
    }
  })
}

export const getFittedInfoByBlockId = (page, size, blockId) => {
  return axios.get(`/cellLine/FittedInfo`, {
    params: {
      page,
      size,
      blockId
    }
  })
}

export const getRecommendDrugIntegrationList = () => {
  return axios.get(`/integration/recommends`)
}

export const getAllcellName = () => {
  return axios.get(`/integration/allCellname`)
}

export const getDrugNameCellName = (drugName) => {
  return axios.get(`/integration/allDrugNameCellname`, {
    params: {
      drugName
    }
  })
}

export const searchDrugCombinationByCombinationName = (combination, page, size, checkedNames, checkedTissue) => {
  return axios.get(`/integration/search`, {
    params: {
      combination,
      page,
      size,
      checkedNames,
      checkedTissue
    }
  })
}

export const searchDrugPages = (drugName, page, size, checkedNames, checkedTissue) => {
  return axios.get(`/integration/search/${encodeURIComponent(drugName)}?page=${page}&size=${size}&checkedNames=${checkedNames}&checkedTissue=${checkedTissue}`)
}

export const getDrugProteinLinksInformation = drugId => {
  return axios.get(`/proteins/${drugId}`, {
    timeout: 30000
  })
}

export const getCombDrugProteinLinksInformation = (cid1, cid2) => {
  return axios.get(`/proteins/combcids`, {
    timeout: 30000,
    params: {
      cid1,
      cid2
    }
  })
}

export const getDrugProteinLinksPages = (drugId, page, size) => {
  return axios.get(`/proteins/${drugId}/page`, {
    timeout: 30000,
    params: {
      page,
      size
    }
  })
}

export const getDrugDescriptionByDrugName = (drugName) => {
  return axios.get(`/combination/description`, {
    timeout: 30000,
    params: {
      drugName
    }
  })
}

export const getCombDrugProteinLinksPages = (cid1, cid2, page, size) => {
  return axios.get(`/proteins/page`, {
    timeout: 30000,
    params: {
      cid1,
      cid2,
      page,
      size
    }
  })
}

export const downloadFileByIndex = index => {
  return axios.post(`/download/${index}`, {}, {
    timeout: Infinity,
    isCompleteResponse: true,
    responseType: 'blob'
  })
}
