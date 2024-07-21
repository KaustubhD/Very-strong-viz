import _ from 'lodash'
import { parse, type ParseResult } from 'papaparse'
import type { Log } from '@/components/Strong/types/Log'

export const parseAndCleanData = async (source: File): Promise<ParseResult<Log>> => {
  const parsedResult: ParseResult<Log> = await new Promise((res) => {
    parse(source, {
      header: true,
      transformHeader: (header) => {
        const transformedHeader = header.charAt(0).toLowerCase() + header.replace(/\s/g, '').slice(1)
        return transformedHeader
      },
      dynamicTyping: true,
      complete: function (results: ParseResult<Log>) {
        res(results)
      }
    })
  })

  return cleanUpData(parsedResult)
}

export const cleanUpData = (originalData: ParseResult<Log>): ParseResult<Log> => {
  _.forEach(originalData.data, (log) => {
    log.dateObj = new Date(log.date)
  })

  return originalData
}
