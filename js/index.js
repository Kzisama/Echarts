window.addEventListener('load', function () {
    // 每一个区域都写一个立即执行函数，防止变量污染

    // 监控区域模块
    (function () {
        $('.monitor .tabs').on('click', 'a', function () {
            // alert(11);
            $(this).addClass('active').siblings('a').removeClass('active');

            $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
        })
        $('.marquee').each(function () {
            const row = $(this).children().clone();
            $(this).append(row);
        })
    })();

    // 点位分布模块
    (function () {
        // 1. 实例化对象
        const myChart = echarts.init(document.querySelector(".pie"));
        // 2. 指定配置项和数据
        const option = {
            color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: "面积模式",
                    type: "pie",
                    radius: [10, 70],
                    center: ["50%", "50%"],
                    roseType: "radius",
                    data: [
                        { value: 20, name: '云南' },
                        { value: 26, name: '北京' },
                        { value: 24, name: '山东' },
                        { value: 25, name: '河北' },
                        { value: 20, name: '江苏' },
                        { value: 25, name: '浙江' },
                        { value: 30, name: '四川' },
                        { value: 42, name: '湖北' }
                    ],
                    // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
                    label: {
                        fontSize: 12
                    },
                    // 修饰引导线样式
                    labelLine: {
                        // 连接到图形的线长度
                        length: 6,
                        // 连接到文字的线长度
                        length2: 8
                    },
                }
            ]
        };

        // 3. 配置项和数据给我们的实例化对象
        myChart.setOption(option);

        // 4. 当我们浏览器缩放的时候，图表也等比例缩放
        window.addEventListener("resize", function () {
            // 让我们的图表调用 resize这个方法
            myChart.resize();
        });
    })();

    // 用户总量模块
    (function () {
        const item = {
            name: '', value: 1200,
            // 修改当前柱形样式
            itemStyle: { color: '#254065' },
            // 不高亮显示
            emphasis: {
                itemStyle: { color: '#254065' }
            },
            // 鼠标经过柱子不显示提示框
            tooltip: {
                extraCssText: 'opacity:0'
            }
        };

        const myChart = echarts.init(document.querySelector('.bar'));

        const option = {
            color: new echarts.graphic.LinearGradient(
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#00fffb' }, // 0 起始颜色
                    { offset: 1, color: '#0061ce' }  // 1 结束颜色
                ]
            ),
            tooltip: {
                trigger: 'item'
                // axisPointer: {
                //     type: 'shadow'
                // }
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true,
                show: true,
                borderColor: 'rgba(0, 240, 255, 0.3)'
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],

                    axisTick: {
                        alignWithLabel: false,
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        alignWithLabel: false,
                        show: false
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
                }
            ]
        };
        myChart.setOption(option);

        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();

    // 订单模块
    (function () {
        // 1. 准备数据
        const data = [{ orders: '20,301,987', amount: '99834' },
        { orders: '301,987', amount: '9834' },
        { orders: '1,987', amount: '3834' },
        { orders: '987', amount: '834' }];

        let index = 0;
        $('.filter').on('click', 'a', function () {
            // console.log($(this).index());
            index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            // 修改数据
            $('#orders').html(data[$(this).index()].orders);
            $('#amount').html(data[$(this).index()].amount);
        })

        let timer = setInterval(function () {
            index++;
            if (index == 4) index = 0;
            $('.order .filter a').eq(index).click();
        }, 3000);

        // 使用mouseenter和mouseleave，这两个事件没有冒泡，不会多次触发
        document.querySelector('.order').addEventListener('mouseenter', function () {
            clearInterval(timer);
        });
        document.querySelector('.order').addEventListener('mouseleave', function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index == 4) index = 0;
                $('.order .filter a').eq(index).click();
            }, 3000);
        });
    })();

    // 销售额模块
    (function () {
        const data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        };
        // 1.初始化实例
        const myChart = echarts.init(document.querySelector('.line'));
        // 2.设置数据
        const option = {
            color: ['#00f2f1', '#ed3f35'],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                right: '10%',
                textStyle: {
                    color: '#4c9bfd'
                }
                // 如果series里面的name设置好了，可以省略data
                // data: ['预期销售额', '实际销售额']
            },
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true,   //显示边框
                borderColor: '#012f4a', //修改边框
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // 去除刻度
                axisTick: {
                    show: false
                },
                // 修改刻度标签颜色
                axisLabel: {
                    color: '#4c9bfd'
                },
                // 去除轴线
                axisLine: {
                    show: false
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
                type: 'value',
                // 去除刻度
                axisTick: {
                    show: false
                },
                // 修改刻度标签颜色
                axisLabel: {
                    color: '#4c9bfd'
                },
                // 修改分割线的颜色
                splitLine: {
                    lineStyle: {
                        colorl: '#012f4a'
                    }
                }
            },
            series: [
                {
                    name: '预期销售额',
                    type: 'line',
                    // 圆滑曲线
                    smooth: true,
                    data: data.year[0]
                },
                {
                    name: '实际销售额',
                    type: 'line',
                    // 圆滑曲线
                    smooth: true,
                    data: data.year[1]
                }
            ]
        };
        // 3.数据配置给实例
        myChart.setOption(option);

        let index = 0;
        $('.sales .caption').on('click', 'a', function () {
            $(this).addClass('active').siblings('a').removeClass('active');
            // 注意元素的索引号是在整个父元素中的，a的前面还有一个h4标签
            index = $(this).index() - 1;
            // 获取到data中对应的元素
            // console.log(this.dataset.type);
            // console.log(data[this.dataset.type]);
            const arr = data[this.dataset.type];
            // 根据获取到的值重新渲染
            option.series[0].data = arr[0];
            option.series[1].data = arr[1];
            myChart.setOption(option);
        })

        // 自动轮播
        let timer = setInterval(function () {
            index++;
            if (index == 4) index = 0;
            $('.sales .caption a').eq(index).click();
        }, 1000);

        // 鼠标经过停止定时器,离开时开启定时器
        $('.sales').hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index == 4) index = 0;
                $('.sales .caption a').eq(index).click();
            }, 1000);
        })
        window.addEventListener('resize', function () {
            myChart.resize();
        });
    })();


    // 渠道 模块
    (function () {
        const myChart = echarts.init(document.querySelector('.radar'));

        const option = {
            // backgroundColor: '#161627',
            // 显示提示框组件
            tooltip: {
                show: true,
                // 控制组件位置
                position: ['55%', '10%']
            },
            radar: {
                indicator: [
                    { name: '机场', max: 100 },
                    { name: '商场', max: 100 },
                    { name: '火车站', max: 100 },
                    { name: '汽车站', max: 100 },
                    { name: '地铁', max: 100 }
                ],
                // 修改雷达图的大小
                radius: '65%',
                shape: 'circle',
                splitNumber: 4,
                axisName: {
                    color: 'rgb(238, 197, 102)'
                },
                name: {
                    // 修饰雷达图文本颜色
                    textStyle: {
                        color: '#4c9bfd'
                    }
                },
                // 分割圆圈线条的样式
                splitLine: {
                    lineStyle: {
                        color: [
                            'rgba(255, 255, 255, 0.5)',
                        ].reverse()
                    }
                },
                splitArea: {
                    show: false
                },
                // 坐标轴线修改为白色半透明
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: 'Beijing',
                    type: 'radar',
                    lineStyle: {
                        width: 1,
                        opacity: 0.5,
                        color: '#fff'
                    },
                    data: [[90, 19, 56, 11, 34]],
                    // 设置图像标记,拐点
                    symbol: 'circle',
                    // 设置拐点大小
                    symbolSize: 5,
                    itemStyle: {
                        color: '#fff'
                    },
                    // 让拐点显示数据
                    label: {
                        show: true,
                        fontSize: 10
                    },
                    areaStyle: {
                        // 修改填充颜色
                        color: 'rgba(238, 197, 102, 0.6)',
                    }
                }
            ]
        };
        myChart.setOption(option);

        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();

    // 销售模块 饼形图 半圆形 设置方式
    (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".gauge"));
        // 2. 指定数据和配置
        var option = {
            series: [
                {
                    name: "销售进度",
                    type: "pie",
                    // 放大图像
                    radius: ["130%", "150%"],
                    // 向下移动一下
                    center: ['48%', '80%'],
                    //是否启用防止标签重叠策略
                    // avoidLabelOverlap: false,
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    // 修改饼图的其实角度为180，注意不是旋转角度
                    startAngle: 180,
                    // 鼠标经过不需要放大图形
                    hoverOffset: 0,
                    selectedOffset: 0,
                    data: [{
                        value: 100,
                        itemStyle: {
                            // 颜色渐变#00c9e0->#005fc1
                            color: new echarts.graphic.LinearGradient(
                                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                    { offset: 1, color: "#005fc1" } // 1 结束颜色
                                ]
                            )
                        }
                    }, {
                        value: 100,
                        itemStyle: {
                            color: '#12274d'
                        }
                    },
                    {
                        value: 200,
                        itemStyle: {
                            color: 'transparent'
                        }
                    }]
                }
            ]
        };
        // 3. 把数据和配置给实例对象
        myChart.setOption(option);

        window.addEventListener('resize', function () {
            myChart.resize();
        })
    })();

    // 全国热榜
    (function () {
        // 1.准备相关数据
        const hotData = [
            {
                city: '北京',  // 城市
                sales: '25,179',  // 销售额
                flag: true, //  上升还是下降
                brands: [   //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ]
            }
        ];

        // 2.根据数据渲染各省热销榜单
        // 变量hotData
        let supHTML = '';
        $.each(hotData, function (index, item) {
            // console.log(item);
            // 模板字符串里面不可以写if else 但是可以写三元表达式
            supHTML += `<li>
                        <span>${item.city}</span>
                        <span>${item.sales} <s class=${item.flag ? "icon-up" : "icon-down"}></s></span>
                    </li>`;
        })
        $('.sup').html(supHTML);

        // 3.鼠标经过tab
        // 渲染函数
        function render(that) {
            that.addClass('active').siblings().removeClass('active');
            // 拿到当前对象的brands属性
            // console.log($(this).index());
            let str = '';
            $.each(hotData[that.index()].brands, function (index, item) {
                str += `<li><span>${item.name}</span><span>${item.num} <s class=${item.flag ? "icon-up" : "icon-down"}></s></span></li>`;
            })
            $('.sub').html(str);
        }
        // 高亮显示
        let index = 0;
        const lis = $('.province .sup li');
        $('.province .sup').on('mouseenter', 'li', function () {
            index = $(this).index();
            render($(this));
        });

        // 4.默认将第一个li处于激活状态，mouseenter
        $('.province .sup li').eq(0).mouseenter();

        // 5.自动切换，鼠标放上去时停止定时器
        let timer = setInterval(function () {
            index++;
            if (index == 5) index = 0;
            render($(lis[index]));
        }, 2000);
        $('.province .sup').hover(
            // 鼠标经过
            function () {
                clearInterval(timer);
            },
            // 鼠标离开
            function () {
                clearInterval(timer);
                timer = setInterval(function () {
                    index++;
                    if (index == 5) index = 0;
                    render($(lis[index]));
                }, 2000);
            }
        )
    })()
})
