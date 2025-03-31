/**
 * 参数缓存工具函数
 * 用于在首页捕获URL参数，并在注册页面获取这些参数
 */

// 缓存参数到localStorage，设置24小时过期
export const cacheParams = (params: Record<string, string>) => {
  if (typeof window === 'undefined') return;
  
  const expireTime = Date.now() + 24 * 60 * 60 * 1000; // 24小时后过期
  
  // 存储参数和过期时间
  localStorage.setItem('cachedParams', JSON.stringify({
    params,
    expireAt: expireTime
  }));
};

// 从URL获取所有参数并缓存
export const cacheUrlParams = () => {
  if (typeof window === 'undefined') return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const params: Record<string, string> = {};
  
  // 将所有URL参数添加到缓存对象
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  
  // 只有在有参数的情况下才缓存
  if (Object.keys(params).length > 0) {
    cacheParams(params);
  }
};

// 获取缓存的参数
export const getCachedParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const cachedData = localStorage.getItem('cachedParams');
  if (!cachedData) return {};
  
  try {
    const { params, expireAt } = JSON.parse(cachedData);
    
    // 检查是否过期
    if (Date.now() > expireAt) {
      // 已过期，清除缓存
      localStorage.removeItem('cachedParams');
      return {};
    }
    
    return params || {};
  } catch (e) {
    console.error('Error parsing cached params', e);
    return {};
  }
};

// 获取特定参数值
export const getCachedParam = (key: string): string | null => {
  const params = getCachedParams();
  return params[key] || null;
};

// 清除缓存的参数
export const clearCachedParams = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('cachedParams');
}; 
