import { getTabList } from "@/app/action-cached";
import {z} from 'zod';
export const createTabSchema=z.object({
  tabName:z
  .string()
  .min(1,'tabName must be at least 1 character long')
  .trim(),
  urlName:z
  .string()
  .min(1,'urlName must be at least 1 character long')
  .trim()
  .refine(async (urlName)=>{
    const tabList=await getTabList();
    // return !tabList.has(urlName)
    return !tabList.some(tab=>tab.urlName===urlName)
  },{message:'urlName already exists'}),
  pathName:z.string(),
  permissions:z.array(z.union([z.literal('visitorReadOnly'),z.literal('visitorFullAccess')]))
})

export const editTabSchema=z.object({
  tabName:z
  .string()
  .min(1,'tabName must be at least 1 character long')
  .trim(),
  urlName:z
  .string()
  .min(1,'urlName must be at least 1 character long')
  .trim()
  .refine(async (urlName)=>{
    const tabList=await getTabList();
    // return !tabList.has(urlName)
    return !tabList.some(tab=>tab.urlName===urlName)
  },{message:'urlName already exists'}),
  pathName:z.string(),
  permissions:z.array(z.union([z.literal('visitorReadOnly'),z.literal('visitorFullAccess')]))
})

export const getEditTabSchema=(originalUrlName:string)=>z.object({
  tabName:z
  .string()
  .min(1,'tabName must be at least 1 character long')
  .trim(),
  urlName:z
  .string()
  .min(1,'urlName must be at least 1 character long')
  .trim()
  .refine(async (urlName)=>{
    console.log('urlName',urlName);
    console.log('originalUrlName',originalUrlName);
    
    if(urlName===originalUrlName){
      return true
    }else{
      const tabList=await getTabList();
      // return !tabList.has(urlName)
      return !tabList.some(tab=>tab.urlName===urlName)
    }
  },{message:'urlName already exists'}),
  pathName:z.string(),
  permissions:z.array(z.union([z.literal('visitorReadOnly'),z.literal('visitorFullAccess')]))
})