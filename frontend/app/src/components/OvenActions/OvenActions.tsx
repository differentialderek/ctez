import React from 'react';
import styled from '@emotion/styled';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {
  FcBusiness,
  FcMoneyTransfer,
  FcPrint,
  FcConferenceCall,
  FcBrokenLink,
  FcPaid,
  FcDecision,
} from 'react-icons/fc';
import { Deposit } from '../../pages/Deposit';
import { Withdraw } from '../../pages/Withdraw';
import { MintOrBurn } from '../../pages/MintOrBurn';
import { Delegate } from '../../pages/Delegate';
import { Liquidate } from '../../pages/Liquidate';
import { EditDepositor } from '../../pages/EditDepositor';

interface TabPanelProps {
  index: number;
  value: number;
}

const StyledTab = styled(Tab)`
  text-transform: none;
`;

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`oven-actions-${index}`}
      aria-labelledby={`oven-action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `oven-action-tab-${index}`,
    'aria-controls': `oven-actions-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    minWidth: '2rem',
  },
}));

export const OvenActions: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation(['common']);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          aria-label="oven related actions"
          scrollButtons
          allowScrollButtonsMobile
        >
          <StyledTab
            className={classes.tab}
            label={t('deposit')}
            icon={<FcBusiness />}
            {...a11yProps(0)}
          />
          <StyledTab
            className={classes.tab}
            label={t('withdraw')}
            icon={<FcMoneyTransfer />}
            {...a11yProps(1)}
          />
          <StyledTab
            className={classes.tab}
            label={t('mint')}
            icon={<FcPrint />}
            {...a11yProps(2)}
          />
          <StyledTab
            className={classes.tab}
            label={t('repay')}
            icon={<FcPaid />}
            {...a11yProps(3)}
          />
          <StyledTab
            className={classes.tab}
            label={t('delegate')}
            icon={<FcConferenceCall />}
            {...a11yProps(4)}
          />
          <StyledTab
            className={classes.tab}
            label={t('liquidate')}
            icon={<FcBrokenLink />}
            {...a11yProps(5)}
          />
          <StyledTab
            className={classes.tab}
            label={t('modifyDepositors')}
            icon={<FcDecision />}
            {...a11yProps(6)}
            autoCapitalize="false"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Deposit />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Withdraw />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MintOrBurn type="mint" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MintOrBurn type="repay" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Delegate />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Liquidate />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <EditDepositor />
      </TabPanel>
    </div>
  );
};
