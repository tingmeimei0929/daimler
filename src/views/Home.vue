<template>
    <div class="form">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px">
            <el-form-item label="姓" prop="contactLastname">
                <el-input v-model="ruleForm.contactLastname"></el-input>
            </el-form-item>
            <el-form-item label="名">
                <el-input v-model="ruleForm.contactFirstname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="contactGender">
                <el-select v-model="ruleForm.contactGender" placeholder="请选择您的性别" :popper-append-to-body="false" popper-class="select-down">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话号码" prop="contactMobilePhone">
                <el-input v-model="ruleForm.contactMobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="省份">
                <el-select v-model="ruleForm.contactProvince" placeholder="请选择省份(直辖市)" clearable @change="renderCity" :popper-append-to-body="false" >
                    <el-option v-for="item in provinceListAll" :key="item.name" :label="item.name" :value="item.name "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="ruleForm.contactCityCn" placeholder="请选择城市" :popper-append-to-body="false" v-if="citySelectAble" clearable >
                    <el-option v-for="item in cityListAll"  :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="感兴趣的品牌" prop="leadInterestedVehicleBrand">
                <el-select v-model="ruleForm.leadInterestedVehicleBrand" placeholder="请选择您感兴趣的品牌" :popper-append-to-body="false" >
                    <el-option label="梅赛德斯-奔驰" value="梅赛德斯-奔驰"></el-option>
                    <el-option label="梅赛德斯-AMG" value="梅赛德斯-AMG"></el-option>
                    <el-option label="梅赛德斯-迈巴赫" value="梅赛德斯-迈巴赫"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="感兴趣的车系" prop="leadInterestedVehicleClass">
                <el-select v-model="ruleForm.leadInterestedVehicleClass" placeholder="请选择您感兴趣的车系" :popper-append-to-body="false" >
                    <el-option v-for="(item,index) in vehicleClassList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经销商ND code" prop="dealerNdCode">
                <el-input v-model="ruleForm.dealerNdCode" placeholder="请输入经销商ND code" >
                </el-input>
            </el-form-item>
            <el-form-item label="数据来源" prop="leadDataSource">
                <el-input v-model="ruleForm.leadDataSource"></el-input>
            </el-form-item>
            <el-form-item label="数据子来源" prop="leadDataSubSource">
                <el-input v-model="ruleForm.leadDataSubSource"></el-input>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker placeholder="选择时间" v-model="ruleForm.campaignMemberRegistrationDate" value-format="yyyy-MM-dd" :disabled="true"></el-date-picker>
            </el-form-item>
            <el-form-item label="Campaign Name" prop="campaignName">
                <el-input v-model="ruleForm.campaignName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "Home",
    data() {
        // <!--验证手机号是否合法-->
        const checkMobile = (rule, value, callback) => {
            const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (!Number.isInteger(+value)) {
                callback(new Error('请输入数字值'))
            } else {
                if (phoneReg.test(value)) {
                    callback()
                } else {
                    callback(new Error("手机号的值不规范，请修正！"))
                }
            }
        }
        return {
            ruleForm: {
                contactLastname: '',
                contactFirstname: '',
                contactGender: '',
                contactMobilePhone: '',
                contactProvince: '',
                contactCityCn: '',
                leadInterestedVehicleBrand: '',
                leadInterestedVehicleClass: '',
                dealerNdCode: '',
                leadDataSource: '',
                leadDataSubSource: '',
                campaignMemberRegistrationDate: '',
                campaignName: ''
            },
            rules: {
                contactLastname: [
                    {required: true, message: '姓的值缺失，请输入值！', trigger: 'blur'},
                ],
                contactGender: [
                    {required: true, message: '性别的值缺失，请输入值！', trigger: 'blur'},
                ],
                contactMobilePhone: [
                    {required: true, message: '手机号的值缺失，请输入值！', trigger: 'blur'},
                    { validator: checkMobile, trigger: 'blur'}
                ],
                leadInterestedVehicleBrand: [
                    {required: true, message: 'Interested Vehicle Brand无效，请确认！', trigger: 'blur'},
                ],
                leadInterestedVehicleClass: [
                    {required: true, message: 'Interested Vehicle Class无效，请确认！', trigger: 'blur'},
                ],
                dealerNdCode: [
                    {required: true, message: '经销商不存在，请确认！', trigger: 'blur'},
                ],
                leadDataSource: [
                    {required: true, message: '数据来源的值缺失，请输入值！', trigger: 'blur'},
                ],
                leadDataSubSource: [
                    {required: true, message: '数据子来源的值缺失，请输入值！', trigger: 'blur'},
                ],
                campaignName: [
                    {required: true, message: 'Campaign Name的值缺失，请输入值！', trigger: 'blur'},
                ]
            },
            vehicleClassList: ["A级轿车","A级掀背车","B级运动旅行车","C级轿车","C级旅行轿车","C级轿跑车",
                "CLA四门轿跑车","CLA五门猎跑车","CLS四门轿跑车","E级轿车","E级轿跑车","E级敞篷轿跑车",
                "S级轿车","S级轿跑车","SLC敞篷跑车","GLA SUV","GLB SUV","GLC SUV","GLC轿跑SUV",
                "GLE SUV","GLE轿跑SUV","GLS SUV","G级越野车","V级MPV","威霆MPV","EQC纯电SUV","梅赛德斯-AMG","梅赛德斯-迈巴赫"
            ],
            provinceListAll: [],
            cityListAll: [],
            citySelectAble: false
        }
    },
    methods: {
        //获取全国所有省份和城市的列表
        getAllProvinceAndCityList () {
            var that = this;
            this.axios.get('https://restapi.amap.com/v3/config/district',{
                // 高德地图的API
                params: {
                    key: '464bc4812a993f0ef2d1fdb5d4f03692',
                    keywords: '中国',
                    subdistrict: 3,
                    extensions: 'base'
                }
            }).then((response) => {
                that.provinceListAll = response.data.districts[0].districts;
                for (let i = 0; i < response.data.districts[0].districts.length; i++) {
                    for (let j = 0; j < response.data.districts[0].districts[i].districts.length; j++) {
                        that.cityListAll.push(response.data.districts[0].districts[i].districts[j]);
                    }
                }
                console.log('省份',that.provinceListAll);
                console.log('城市',that.cityListAll);
            });
        },
        renderCity() {    // 根据选择的省份，展示该省份相对应的城市列表，未选择省份时，不能选择城市
            if(this.ruleForm.contactProvince.length > 0) {
                this.cityListAll = this.provinceListAll.filter(item => item.name == this.ruleForm.contactProvince)[0].districts;
                this.citySelectAble = true;
            } else if(!this.ruleForm.contactProvince) {
                this.citySelectAble = false;
                this.ruleForm.contactCityCn = '';     // 清空省份选择时，清空之前选择的城市能进行重新选择城市
            }
        },
        //获取当前时间
        getNowTime() {
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            month = month.toString().padStart(2, "0");
            date = date.toString().padStart(2, "0");
            var defaultDate = `${year}-${month}-${date}`;
            this.$set(this.ruleForm, "campaignMemberRegistrationDate", defaultDate);
        },
        // 表单提交
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios.post('/medialead/mediaLead/upload',
                        {
                            'contactLastname': this.ruleForm.contactLastname,
                            'contactFirstname': this.ruleForm.contactFirstname,
                            'contactGender': this.ruleForm.contactGender,
                            'contactMobilePhone': this.ruleForm.contactMobilePhone,
                            'contactProvince': this.ruleForm.contactProvince,
                            'contactCityCn': this.ruleForm.contactCityCn,
                            'leadInterestedVehicleBrand': this.ruleForm.leadInterestedVehicleBrand,
                            'leadInterestedVehicleClass': this.ruleForm.leadInterestedVehicleClass,
                            'dealerNdCode': this.ruleForm.dealerNdCode,
                            'leadDataSource': this.ruleForm.leadDataSource,
                            'leadDataSubSource': this.ruleForm.leadDataSubSource,
                            'campaignMemberRegistrationDate': this.ruleForm.campaignMemberRegistrationDate,
                            'campaignName': this.ruleForm.campaignName,
                        },
                        {headers: {
                            "x-api-key": "adf7f0c0-0b9d-4c75-bd1d-94515625f9f7",
                            'Content-Type':"application/json"
                        }
                        }).then(res => {
                            console.log(res)
                            this.$message.success('Registration successful')
                        })
                }else {
                    console.log('error submit!');
                    return false;
                }
            })
        }
    },
    watch: {   // watch 监听 ruleForm.contactProvince
        'ruleForm.contactProvince': function (newValue, oldValue) {
            this.ruleForm.contactCityCn = '';
        }
    },
    created() {    // 页面加载时调用的函数
        this.getAllProvinceAndCityList();
    },
    mounted: function() {
        this.getNowTime()
    }

};
</script>
<style lang="scss" scoped>
@import url('../assets/scss/home.scss');
</style>

