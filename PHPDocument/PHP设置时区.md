### 设置时区



```php
   /**
   * date_default_timezone_set();
   * date_default_timezone_get() 得到时区
   * 亚洲时区
   * PRC 中华人民共和国
   * 修改php配置文件 php.ini date.timezone = PRC 重启服务器
   */
```





* date 函数的使用以及常用参数介绍



```php
switch(date('w')) {
  case 0: $dayStr = '日';
    break;
  case 1: $dayStr = '一';
    break;  
  case 2: $dayStr = '二';
    break;
  case 3: $dayStr = '三';
    break;
  case 4: $dayStr = '四';
    break;
  case 5: $dayStr = '五';
    break;
  case 6: $dayStr = '六';
    break;
}

echo date('Y年m月d日').' 星期'.$dayStr;
```

