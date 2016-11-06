import * as get from './getters'

// Vuex actions

export const updateSelectedSeason = ({ dispatch, state }, val) => {
  dispatch('UPDATE_SELECTED_SEASON', val)
}

export const updateSelectedRegion = ({ dispatch, state }, val) => {
  dispatch('UPDATE_SELECTED_REGION', val)
}

export const updateSelectedWeek = ({ dispatch, state }, val) => {
  dispatch('UPDATE_SELECTED_WEEK', val)
}

export const updateSelectedChoropleth = ({ dispatch, state}, val) => {
  dispatch('UPDATE_SELECTED_CHOROPLETH', val)
}

// Initializations
// ---------------

export const initTimeChart = ({ dispatch, state }, val) => {
  dispatch('SET_TIMECHART', val)
}

export const initChoropleth = ({ dispatch, state }, val) => {
  dispatch('SET_CHOROPLETH', val)
}

// Plotting (data-changing) actions
// --------------------------------

/**
 * Plot (update) time chart with region / season data
 */
export const plotTimeChart = ({ dispatch, state }) => {
  let data = get.timeChartData(state)

  get.timeChart(state).plot(data)
}

/**
 * Plot (update) choropleth with currently selected data
 */
export const plotChoropleth = ({ dispatch, state }) => {
  let data = get.choroplethData(state)

  get.choropleth(state).plot(data)
  updateChoropleth({ dispatch, state })
}

/**
 * Tell time chart to move markers to weekIdx
 */
export const updateTimeChart = ({ dispatch, state }) => {
  get.timeChart(state).update(get.selectedWeekIdx(state))
}

/**
 * Tell choropleth to move to weekidx and highlight a region
 */
export const updateChoropleth = ({ dispatch, state }) => {
  let payload = {
    weekIdx: get.selectedWeekIdx(state),
    regionIdx: get.selectedRegion(state) - 1
  }

  get.choropleth(state).update(payload)
}

/**
 * Update week pointer in main store
 * and let watchers take care of everything else
 */
export const forward = ({ dispatch, state }) => {
  updateSelectedWeek({ dispatch, state }, get.nextWeek(state))
}

/**
 * Update week pointer in main store
 * and let watchers take care of everything else
 */
export const backward = ({ dispatch, state }) => {
  updateSelectedWeek({ dispatch, state }, get.previousWeek(state))
}
