const DesignToken = {
  token: {
    colorPrimary: '#dc8622',
    colorText: '#525252',
    colorTextDisabled: '#525252',
    colorTextPlaceholder: '#525252',
    colorSuccess: '#04805a',
    colorError: '#bc2020',
    borderRadius: 6,
    fontFamily: 'Graphik',
    colorBorder: '#e4e4e4',
    fontSize: 14
  },
  components: {
    Form: {
      itemMarginBottom: 16
    },
    Input: {
      controlHeight: 48,
      paddingInline: 16
    },
    InputNumber: {
      controlHeight: 48,
      paddingInline: 16
    },
    Button: {
      controlHeight: 48,
      paddingInline: 24,
      fontSize: 16,
      defaultShadow: 'none',
      primaryShadow: 'none'
    },
    Select: {
      width: '100%',
      controlHeight: 48,
      optionHeight: 36,
      paddingInline: 16
    },
    DatePicker: {
      width: '100%',
      controlHeight: 48
    },
    TimePicker: {
      width: '100%',
      controlHeight: 48
    },
    Table: {
      headerBg: '#f9f9f9',
      headerColor: '#525252',
      bodyColor: '#525252',
      borderColor: '#ebebeb',
      fontWeightStrong: 400,
      cellPaddingBlock: 12
    },
    Tooltip: {
      colorBgSpotlight: '#b7b7b7'
    },
    Breadcrumb: {
      separatorColor: '#b7b7b7',
      itemColor: '#b7b7b7',
      linkColor: '#b7b7b7',
      lastItemColor: '#404040',
      separatorMargin: 6,
      lastItemColor: '#dc8622',
      fontSize: 14
    },
    Descriptions: {
      labelColor: '#525252',
      titleColor: '#525252'
    },
    Progress: {
      defaultColor: '#dc8622'
    },
    Rate: {
      iconColor: '#dc8622'
    }
  }
};

export default DesignToken;
