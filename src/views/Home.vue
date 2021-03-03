<template>
    <div class="form">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140px">
            <el-form-item label="姓" prop="contactLastname">
                <el-input v-model="ruleForm.contactLastname"></el-input>
            </el-form-item>
            <el-form-item label="名" prop="contactFirstname">
                <el-input v-model="ruleForm.contactFirstname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="contactGender">
                <el-select v-model="ruleForm.contactGender" placeholder="请选择您的性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话号码" prop="contactMobilePhone">
                <el-input v-model="ruleForm.contactMobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="省份" prop="contactProvince">
                <el-select v-model="ruleForm.contactProvince" placeholder="请选择省份" @change="changeSelect">
                    <el-option v-for="(item,index) in provinceList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="城市" prop="contactCityCn">
                <el-select v-model="ruleForm.contactCityCn" placeholder="请选择城市">
                    <el-option v-for="(cityName,index) in cityList"  :key="index" :label="cityName" value="cityName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="感兴趣的品牌" prop="leadInterestedVehicleBrand">
                <el-select v-model="ruleForm.leadInterestedVehicleBrand" placeholder="请选择您感兴趣的品牌">
                    <el-option label="梅赛德斯-奔驰" value="梅赛德斯-奔驰"></el-option>
                    <el-option label="梅赛德斯-AMG" value="梅赛德斯-AMG"></el-option>
                    <el-option label="梅赛德斯-迈巴赫" value="梅赛德斯-迈巴赫"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="感兴趣的车系" prop="leadInterestedVehicleClass">
                <el-select v-model="ruleForm.leadInterestedVehicleClass" placeholder="请选择您感兴趣的车系">
                    <el-option v-for="(item,index) in vehicleClassList" :key="index" :label="item" value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经销商" prop="dealerNdCode">
                <el-input v-model="ruleForm.dealerNdCode"></el-input>
            </el-form-item>

            <el-form-item label="数据来源" prop="leadDataSource">
                <el-input v-model="ruleForm.leadDataSource"></el-input>
            </el-form-item>
            <el-form-item label="数据子来源" prop="leadDataSubSource">
                <el-input v-model="ruleForm.leadDataSubSource"></el-input>
            </el-form-item>
            <el-form-item label="日期" prop="campaignMemberRegistrationDate">
                <el-input v-model="ruleForm.campaignMemberRegistrationDate"></el-input>
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
                contactFirstname: [
                    {required: true, message: '名的值缺失，请输入值！', trigger: 'blur'},
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
                                "GLE SUV","GLE轿跑SUV","GLS SUV","G级越野车","V级MPV","威霆MPV","EQC纯电SUV","梅赛德斯-AMG","梅赛德斯-迈巴赫"]
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if(vaild) {
                    alert('submit')
                    let formData = new FormData()
                    for(let key in this.ruleForm) {
                        formData.append(key, this.ruleForm[key])
                        console.log(formData.get[key])
                    }
                    this.axios.post('', formData).then(res => {
                        this.$message.success('Registration successful')
                    })
                }else {
                    console.log('error submit!')
                    return false
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
@import url('../assets/scss/home.scss');
</style>