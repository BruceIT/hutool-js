interface StrUtil {
  isAllUpperCase(type: string): boolean;

}

declare namespace hutool {
  const StrUtil: StrUtil;
}

export = hutool
